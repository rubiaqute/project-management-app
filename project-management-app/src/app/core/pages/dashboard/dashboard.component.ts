import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isDarkTheme: boolean = false;
  langValue: boolean = false;

  constructor(public translate: TranslateService, private router: Router) {}

  public changeLanguage(): void {
    this.langValue = !this.langValue;
    if (this.langValue) this.translate.use('ru');
    else this.translate.use('en');
  }

  public onLogin(): void {
    this.router.navigate(['auth/login']);
  }

  public onRegister(): void {
    this.router.navigate(['auth/sign-up']);
  }
}
