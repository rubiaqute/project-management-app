import {Component, HostListener, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import {window} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isDarkTheme!: boolean

  constructor(private store: Store) { }
  ngOnInit(): void {
    this.isDarkTheme = false
  }
  onWindowScroll($event: any) {
    let element = document.querySelector('.header-container') as HTMLElement;
    let main = document.querySelector('.main') as HTMLElement;
    if (main.scrollTop > 0) {
      element.classList.add('header-active');
    } else {
      element.classList.remove('header-active');
    }
  }
}
