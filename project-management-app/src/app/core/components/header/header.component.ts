import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isDarkTheme: boolean = false;

  langValue: boolean = false;

  @Output() themeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public translate: TranslateService, private router: Router) {}

  public changeLanguage(): void {
    this.langValue = !this.langValue;
    if (this.langValue) this.translate.use('ru');
    else this.translate.use('en');
  }

  public changeTheme(value: boolean): void {
    this.themeChanged.emit(value);
  }

  public onLogin(): void {
    this.router.navigate(['auth/login']);
  }

  public onRegister(): void {
    this.router.navigate(['auth/sign-up']);
  }
}
