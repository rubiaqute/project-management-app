import {Component, Output, EventEmitter, OnInit, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from "../../../auth/services/auth.service";
import { Router } from "@angular/router";
import {Observable, Subscription} from "rxjs";
import { ApiServices } from "../../services/api-services.service";
import {IBoardRequest, IUser, Status} from '../../models/api.models';
import { ApiFacade } from 'src/app/store/facade';
import {ModalComponent} from "../../../shared/components/modal/modal.component";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ofType} from "@ngrx/effects";
import {BoardsTypes} from "../../../store/actions/boards.actions";
import {ActionsSubject} from "@ngrx/store";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isDarkTheme: boolean = false;
  public id: string | undefined;
  public isErrorModalOn: boolean = false
  public subscription: Subscription[] = [];
  public titleValue: string = '';
  public descriptionValue: string = '';
  public langValue: boolean = false;
  public newBoardForm!: FormGroup;
  public subsc = new Subscription();
  public activeUser$: Observable<IUser | null> = this.apiFacade.activeUser$;
  public activeUserStatus$: Observable<Status> = this.apiFacade.activeUserStatus$;
  public modalTitle = "BOARD.CREATE_NEW_BOARD";
  public isLoading: Observable<boolean> = this.apiFacade.boardsLoadingStatus$

  @ViewChild(ModalComponent) child : ModalComponent | undefined;

  @Output() themeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    public translate: TranslateService,
    public authService: AuthService,
    public apiService: ApiServices,
    private router: Router,
    private apiFacade: ApiFacade,
    private actionsSubj: ActionsSubject) {
  }

    ngOnInit(): void {
    this.activeUserStatus$.subscribe((status) => {
      if (status === Status.FAILURE) {
        this.authService.clearInfo();
        this.isErrorModalOn = true
        setTimeout(() => this.router.navigateByUrl('/auth/login'), 0);
      }
    })
    this.authService.initAuth();

    this.newBoardForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

      this.subsc = this.actionsSubj.pipe(
        ofType(BoardsTypes.CreateBoardSuccess)
      ).subscribe(data => {
        this.router.navigateByUrl('/main')
      });
  }

  public changeLanguage(): void {
    this.langValue = !this.langValue;
    if (this.langValue) this.translate.use('ru');
    else this.translate.use('en');
  }

  public changeTheme(): void {
    this.isDarkTheme = !this.isDarkTheme
    this.themeChanged.emit(this.isDarkTheme)
  }

  public edit() {
    setTimeout(() => this.router.navigateByUrl('/form'), 0);
  }

  public logout() {
    this.authService.clearInfo();
    setTimeout(() => this.router.navigateByUrl(''), 0);
  }

  public openNewBoardModal() {
    this.child?.toggleModal();
  }

  get title(): AbstractControl | null {
    return this.newBoardForm.get('title');
  }

  get description(): AbstractControl | null {
    return this.newBoardForm.get('description');
  }

  public addNewBoard() {
    const body: IBoardRequest = {
      title: this.title?.value,
      description: this.description?.value,
    }
    this.apiFacade.createBoard(body);
    this.child?.toggleModal();
  }
}
