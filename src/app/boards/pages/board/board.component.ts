import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { ApiServices } from 'src/app/core/services/api-services.service';
import { IBoard, IColumn, IColumnRequest, ITask, Status } from 'src/app/core/models/api.models';
import { ApiFacade } from 'src/app/store/facade';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  public activeBoard$: Observable<IBoard | null> = this.apiFacade.activeBoard$
  public columns$: Observable<IColumn[]> = this.apiFacade.activeBoardColumns$
  private columnsArray: IColumn[] = []
  isLoading$: Observable<boolean> = this.apiFacade.activeBoardLoadingStatus$

  public id: string | undefined;
  public subscription: Subscription[] = [];

  public board: IBoard | undefined;

  public MAX_COLUMN_ORDER: number = 0;

  public isColumnModalOn: boolean = false;

  public isErrorModalOn: boolean = false;

  public isLoaderOn: boolean = false;

  public title: string | undefined;

  // public currentColumn!: IColumn;

  public currentTask: ITask | undefined;

  public prevColumn: IColumn | undefined;

  public INDEX_COEFFICIENT: number = 100000000;

  public dropCounter: number = 0;

  constructor(
    private activateRoute: ActivatedRoute,
    private api: ApiServices,
    private apiFacade: ApiFacade
  ) { }

  ngOnInit(): void {
    this.subscription.push(
      this.activateRoute.params.subscribe(
        (params: { [x: string]: string | undefined }) => {
          this.id = params['id']
          this.apiFacade.getActiveBoard(this.id!)
        }
      )
    );
    this.columns$.subscribe((columns) => {
      this.MAX_COLUMN_ORDER = columns.length ? Math.max(...columns.map((el) => el.order)) : 0
      this.columnsArray = columns
    })

    // this.isLoaderOn = true;

    // this.subscription.push(
    //   this.api.getBoardById(this.id!)
    //     .subscribe((data) => {
    //       data?.columns?.sort((a, b) => a.order - b.order);
    //       this.board = data;
    //       this.MAX_COLUMN_ORDER = this.board.columns?.slice(-1)[0] ?
    //         this.board.columns?.slice(-1)[0].order :
    //         0 * this.INDEX_COEFFICIENT;
    //       this.isLoaderOn = false;
    //     }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(item => item.unsubscribe());
  }

  public createColumn(title: string): void {
    const order = this.MAX_COLUMN_ORDER + this.INDEX_COEFFICIENT
    console.log('order' + order)
    const columnRequest: IColumnRequest = {
      title,
      order,
    };
    this.apiFacade.createColumn(columnRequest, this.id!)

    // this.api
    //   .createColumn(columnRequest, this.board!.id!)
    //   .subscribe((data) => this.board?.columns?.push(data),
    //     (err) => {
    //       this.switchErrorModal();
    //     });
  }

  public isLoadingActiveBoard(status: Status) {
    return status === Status.LOADING
  }

  public switchAddColumnModal(): void {
    this.isColumnModalOn = !this.isColumnModalOn;
    this.title = '';
  }

  public switchErrorModal(): void {
    this.isErrorModalOn = !this.isErrorModalOn;
  }
  // drop(event: CdkDragDrop<string[]>) {
  //   const previousIndex = prevIndex
  //   const currentIndex = event.currentIndex
  //   let newOrder;
  //   if (previousIndex > currentIndex) {
  //     const pivot = this.columnsSorted[currentIndex - 1] ?
  //       this.columnsSorted[currentIndex - 1].order : this.columnsSorted[currentIndex].order - 1000
  //     newOrder = Math.round((this.columnsSorted[currentIndex].order + pivot) / 2)
  //   }
  //   if (previousIndex < currentIndex) {
  //     const pivot = this.columnsSorted[currentIndex + 1] ?
  //       this.columnsSorted[currentIndex + 1].order : this.columnsSorted[currentIndex].order + 1000
  //     newOrder = Math.round((this.columnsSorted[currentIndex].order + pivot) / 2)
  //   }
  //   if (newOrder) {
  //     console.log(newOrder)
  //     const column = {
  //       title: this.columnsSorted[previousIndex].title,
  //       order: newOrder
  //     }
  //     this.apiFacade.updateColumn(this.id!, this.columnsSorted[previousIndex].id, column)
  //   }
  // }
  public drop(event: CdkDragDrop<IColumn[]>): void {

    const previousIndex = event.previousIndex
    const currentIndex = event.currentIndex
    let newOrder;
    if (previousIndex > currentIndex) {
      const pivot = this.columnsArray[currentIndex - 1] ?
        this.columnsArray[currentIndex - 1].order : this.columnsArray[currentIndex].order - this.INDEX_COEFFICIENT
      newOrder = Math.round((this.columnsArray[currentIndex].order + pivot) / 2)
    }
    if (previousIndex < currentIndex) {
      const pivot = this.columnsArray[currentIndex + 1] ?
        this.columnsArray[currentIndex + 1].order : this.columnsArray[currentIndex].order + this.INDEX_COEFFICIENT
      newOrder = Math.round((this.columnsArray[currentIndex].order + pivot) / 2)
    }
    if (newOrder) {
      const column = {
        title: this.columnsArray[previousIndex].title,
        order: newOrder
      }
      this.apiFacade.updateColumn(this.id!, this.columnsArray[previousIndex].id, column)

      // this.swithLoader();

      // this.api.updateColumn(this.board!.id!,
      //   this.currentColumn.id,
      //   columnRequest)
      //   .subscribe(
      //     (data) => {
      //       this.board?.columns?.splice(event.currentIndex, 1, data);
      //       this.swithLoader();
      //     },
      //     (err) => {
      //       this.switchErrorModal();
      //       this.swithLoader();
      //     });
    }
  }

  // public setCurrentColumn(column: IColumn) {
  //   this.currentColumn = column;
  // }

  // public swithLoader() {
  //   this.isLoaderOn = !this.isLoaderOn;
  // }
}
