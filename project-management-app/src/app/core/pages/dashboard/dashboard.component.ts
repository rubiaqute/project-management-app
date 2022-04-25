import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isDarkTheme = false;
  langValue = false;

  constructor(public translate: TranslateService) { }

  changeLanguage() {
    this.langValue = !this.langValue
    if (this.langValue) this.translate.use('ru')
    else this.translate.use('en')
  }

}
