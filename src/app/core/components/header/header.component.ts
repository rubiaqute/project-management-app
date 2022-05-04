import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from "../../../auth/services/auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ApiServices } from "../../services/api-services";
import { Store } from '@ngrx/store';
import { MainState } from 'src/app/store/store';
import { toggleDarkTheme } from 'src/app/store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDarkTheme: boolean = false;
  langValue: boolean = false;
  isAuthorized!: Observable<boolean>
  currentUser!: Observable<string | undefined>

  @Output() themeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public translate: TranslateService,
    public authService: AuthService,
    public apiService: ApiServices,
    private router: Router,
    private store: Store<MainState>) {
  }

  ngOnInit(): void {
    this.isAuthorized = this.store.select((state) => state.mainState.isAuthorized)
    this.currentUser = this.store.select((state) => state.mainState.activeUser?.name)
    this.authService.initAuth();
  }

  public changeLanguage(): void {
    this.langValue = !this.langValue;
    if (this.langValue) this.translate.use('ru');
    else this.translate.use('en');
  }

  public changeTheme(): void {
    this.store.dispatch(toggleDarkTheme({ isDarkTheme: this.isDarkTheme }))
  }

  edit() {
    setTimeout(() => this.router.navigateByUrl('/form'), 0);
  }

  logout() {
    this.authService.clearInfo();
    setTimeout(() => this.router.navigateByUrl('/auth/login'), 0);
  }

}
