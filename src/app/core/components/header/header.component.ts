import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from "../../../auth/services/auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ApiServices } from "../../services/api-services.service";
import { IUser, Status } from '../../models/api.models';
import { ApiFacade } from 'src/app/store/facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDarkTheme: boolean = false;
  langValue: boolean = false;
  public activeUser$: Observable<IUser | null> = this.apiFacade.activeUser$;
  public activeUserStatus$: Observable<Status> = this.apiFacade.activeUserStatus$;

  @Output() themeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public translate: TranslateService,
    public authService: AuthService,
    public apiService: ApiServices,
    private router: Router,
    private apiFacade: ApiFacade) {
  }

  ngOnInit(): void {
    this.activeUserStatus$.subscribe((status) => {
      if (status === Status.FAILURE) {
        this.authService.clearInfo();
        setTimeout(() => this.router.navigateByUrl('/auth/login'), 0);
      }
    })
    this.authService.initAuth();
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

  edit() {
    setTimeout(() => this.router.navigateByUrl('/form'), 0);
  }

  logout() {
    this.authService.clearInfo();
    setTimeout(() => this.router.navigateByUrl(''), 0);
  }
}
