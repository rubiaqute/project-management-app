import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isDarkTheme: boolean = false;

  constructor() {
  }

  public themeChanged(value: any): void {
    this.isDarkTheme = value;
  }
}
