import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiServices } from 'src/app/core/services/api-services.service';
import { IBoard, IColumn, IColumnRequest, ITask } from 'src/app/core/models/api.models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  public id: string | undefined;
  public subscription: Subscription[] = [];

  public board: IBoard | undefined;

  public MAX_COLUMN_ORDER: number = 0;

  public isColumnModalOn: boolean = false;

  public isErrorModalOn: boolean = false;

  public isLoaderOn: boolean = false;

  public title: string | undefined;

  public currentColumn!: IColumn;

  public currentTask: ITask | undefined;

  public prevColumn: IColumn | undefined;

  public INDEX_COEFFICIENT: number = 100000000;

  public dropCounter: number = 0;

  constructor(
    private activateRoute: ActivatedRoute,
    private api: ApiServices
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.activateRoute.params.subscribe(
        (params: { [x: string]: string | undefined }) =>
          (this.id = params['id'])
      )
    );

    this.isLoaderOn = true;

    this.subscription.push(
      this.api.getBoardById(this.id!)
        .subscribe((data) => {
          data?.columns?.sort((a,b) => a.order - b.order);
          this.board = data;
          this.MAX_COLUMN_ORDER = this.board.columns?.slice(-1)[0] ?
                                  this.board.columns?.slice(-1)[0].order :
                                  0 * this.INDEX_COEFFICIENT;
          this.isLoaderOn = false;
        }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(item => item.unsubscribe());
  }

  public createColumn(title: string): void {
    this.MAX_COLUMN_ORDER = this.MAX_COLUMN_ORDER + this.INDEX_COEFFICIENT;

    const columnRequest: IColumnRequest = {
      title: title,
      order: this.MAX_COLUMN_ORDER,
    };

    this.api
      .createColumn(columnRequest, this.board!.id!)
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

    if (event.previousIndex !== event.currentIndex) {
      const nextItem: number = this.board!.columns![event.currentIndex + 1] ?
                              this.board!.columns![event.currentIndex + 1].order :
                              this.MAX_COLUMN_ORDER + this.INDEX_COEFFICIENT * 2;
      const prevItem: number = this.board!.columns![event.currentIndex - 1] ?
                              this.board!.columns![event.currentIndex - 1].order :
                              0;
      let freeIdx: number = Math.round(((nextItem - prevItem) / 2) + prevItem);

      const columnRequest: IColumnRequest = {
          title: this.currentColumn.title,
          order: freeIdx,
        }
        
      this.swithLoader();

      this.api.updateColumn(this.board!.id!,
                            this.currentColumn.id,
                            columnRequest)
        .subscribe(
          (data) => {
            this.board?.columns?.splice(event.currentIndex, 1, data);
            this.swithLoader();
          },
          (err) => {
            this.switchErrorModal();
            this.swithLoader();
          });
    }
  }

  public setCurrentColumn(column: IColumn) {
    this.currentColumn = column; 
  }

  public swithLoader() {
    this.isLoaderOn = !this.isLoaderOn;
  }
}
