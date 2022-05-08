import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IBoard } from 'src/app/core/models/api.models';
import { ApiFacade } from 'src/app/store/facade';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public id: string | undefined;
  public activeBoard: Observable<IBoard | null> = this.apiFacade.activeBoard$
  public subscription: Subscription[] = [];
  public isTitleEditMode: boolean = false;
  constructor(private activateRoute: ActivatedRoute, private apiFacade: ApiFacade) { }

  ngOnInit(): void {
    this.subscription.push(
      this.activateRoute.params.subscribe(
        (params: { [x: string]: string | undefined }) => {
          this.id = params['id']
          this.apiFacade.getActiveBoard(this.id!)
          console.log(this.activeBoard)
        }

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
