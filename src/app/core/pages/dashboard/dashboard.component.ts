import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiState } from 'src/app/store/state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isDarkTheme!: Observable<boolean>;

  constructor(private store: Store<ApiState>) { }
  ngOnInit(): void {
    this.isDarkTheme = this.store.select((state) => state.isDarkTheme)
  }

}
