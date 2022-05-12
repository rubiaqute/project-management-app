import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public id: string | undefined;
  public subscription: Subscription[] = [];
  public isTitleEditMode: boolean = false;
  constructor(private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription.push(
      this.activateRoute.params.subscribe(
        (params: { [x: string]: string | undefined }) =>
          (this.id = params['id'])
      )
    );
  }

  public openTitleEdit() {
    this.isTitleEditMode = true;
  }

  public closeTitleEdit() {
    this.isTitleEditMode = false;
  }
}
