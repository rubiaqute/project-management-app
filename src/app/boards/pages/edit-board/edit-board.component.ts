import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiServices } from "../../../core/services/api-services.service";
import { IBoard, IBoardRequest } from "../../../core/models/api.models";
import { ApiFacade } from 'src/app/store/facade';
import { ActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { BoardsTypes } from 'src/app/store/actions/boards.actions';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.scss']
})
export class EditBoardComponent implements OnInit, OnDestroy {
  public id: string | undefined;
  public subscription: Subscription[] = [];
  public titleValue: string = '';
  public descriptionValue: string = '';
  public editBoardForm!: FormGroup;
  subsc = new Subscription();
  isLoading: Observable<boolean> = this.apiFacade.boardsLoadingStatus$

  constructor(private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private apiService: ApiServices,
    private apiFacade: ApiFacade,
    private actionsSubj: ActionsSubject) {
  }

  ngOnInit(): void {
    this.subscription.push(
      this.activateRoute.params.subscribe(
        (params: { [x: string]: string | undefined }) =>
          (this.id = params['id'])
      )
    );
    this.editBoardForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    if (this.id) {
      this.apiService.getBoardById(this.id).subscribe((data: IBoard) => {
        this.titleValue = data.title;
        this.descriptionValue = data.description
      })
    }
    this.subsc = this.actionsSubj.pipe(
      ofType(BoardsTypes.UpdateBoardSuccess)
    ).subscribe(data => {
      this.router.navigateByUrl('/main')
    });
  }

  get title(): AbstractControl | null {
    return this.editBoardForm.get('title');
  }

  get description(): AbstractControl | null {
    return this.editBoardForm.get('description');
  }


  editBoard() {
    const body: IBoardRequest = {
      title: this.title?.value,
      description: this.description?.value,
    }
    if (this.id) {
      this.apiFacade.updateBoardById(body, this.id)
    }
  }

  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
}
