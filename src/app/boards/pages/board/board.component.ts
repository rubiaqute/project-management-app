import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBoard, IColumn, IColumnRequest } from 'src/app/core/models/api.models';
import { ApiServices } from 'src/app/core/services/api-services';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  public id: string | undefined;

  public subscription: Subscription[] = [];

  public board: IBoard | undefined;

  public MAX_COLUMN_ORDER: number = -1;

  public isColumnModalOn: boolean = false;

  public isErrorModalOn: boolean = false;

  public title: string | undefined;

  constructor(
    private activateRoute: ActivatedRoute,
    private api: ApiServices,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.activateRoute.params.subscribe(
        (params: { [x: string]: string | undefined }) =>
          (this.id = params['id'])
      )
    );

    this.subscription.push(
      this.api.getBoardById(this.id!)
        .subscribe((data) => {
          data?.columns?.sort((a,b) => a.order - b.order);
          this.board = data;
          this.MAX_COLUMN_ORDER = this.board.columns?.slice(-1)[0] ?
                                  this.board.columns?.slice(-1)[0].order :
                                  -1;
        }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(item => item.unsubscribe());
  }

  public createColumn(title: string): void {
    const columnRequest: IColumnRequest = {
      title: title,
      order: ++this.MAX_COLUMN_ORDER,
    };

    this.api
      .createColumn(columnRequest, this.board!.id)
      .subscribe((data) => this.board?.columns?.push(data),
                 (err) => {
                  this.switchErrorModal();
                  });
  }

  public switchAddColumnModal(): void {
    this.isColumnModalOn = !this.isColumnModalOn;
    this.title = '';
  }

  public switchErrorModal(): void {
    this.isErrorModalOn = !this.isErrorModalOn;
  }

  public drop(event: CdkDragDrop<IColumn[]>): void {
    moveItemInArray(this.board?.columns!, event.previousIndex, event.currentIndex);
  }
}
