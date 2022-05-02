import { Component, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isDarkTheme: boolean = false;
  langValue: boolean = false;
  logOut: boolean = this.authService.loadInfo();
  subs: Subscription | undefined;

  @Output() themeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public translate: TranslateService,
              public authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.subs = this.authService.token$.subscribe((token) =>
      this.logOut = !!token
    )
  }

  public changeLanguage(): void {
    this.langValue = !this.langValue;
    if (this.langValue) this.translate.use('ru');
    else this.translate.use('en');
  }

  public changeTheme(value: boolean): void {
    this.themeChanged.emit(value);
  }

  edit() {
    setTimeout(() => this.router.navigateByUrl('/form'), 0);
  }

  logout() {
    this.authService.clearInfo();
    setTimeout(() => this.router.navigateByUrl('/auth/login'), 0);
  }
}
