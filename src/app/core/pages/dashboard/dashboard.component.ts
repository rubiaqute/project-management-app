import {Component, HostListener, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {window} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isDarkTheme!: boolean

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.isDarkTheme = false
  }

  onWindowScroll(isDarkTheme: boolean) {
    let header = document.querySelector('.header-container') as HTMLElement;
    let footer = document.querySelector('.footer-container') as HTMLElement;
    let main = document.querySelector('.main') as HTMLElement;
    if (isDarkTheme) {
      header.classList.remove('header-active');
      footer.classList.remove('footer-active');
      if (main.scrollTop > 0) {
        header.classList.add('header-dark');
        footer.classList.add('footer-dark');
      } else {
        header.classList.remove('header-dark');
        footer.classList.remove('footer-dark');
      }
    } else {
      header.classList.remove('header-dark');
      footer.classList.remove('footer-dark');
      if (main.scrollTop > 0) {
        header.classList.add('header-active');
        footer.classList.add('footer-active');
      } else {
        header.classList.remove('header-active');
        footer.classList.remove('footer-active');
      }
    }
  }
}
