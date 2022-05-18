import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ofType} from '@ngrx/effects';
import {ActionsSubject} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {IBoard, IColumn, IColumnRequest, ITask, Status} from 'src/app/core/models/api.models';
import {ActiveBordTypes} from 'src/app/store/actions/active-board.actions';
import {ApiFacade} from 'src/app/store/facade';
import {ModalComponent} from "../../../shared/components/modal/modal.component";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  public id: string | undefined | null;
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

  public addColumnForm!: FormGroup;
  public modalTitle = "BOARD.ADD_COLUMN";
  @ViewChild(ModalComponent) child: ModalComponent | undefined;

  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private apiFacade: ApiFacade,
    private actionsSubj: ActionsSubject) {
  }

  ngOnInit(): void {
    this.addColumnForm = this.fb.group({
      title: ['', [Validators.required]]
    });

    this.subscription.push(
      this.activateRoute.params.subscribe(
        (params: { [x: string]: string | undefined }) => {
          this.id = params['id']
          this.apiFacade.getActiveBoard(this.id!)
        }
      )
    );
    this.apiFacade.getUsers()
    this.subscription.push(
      this.columns$.subscribe((columns) => {
        this.MAX_COLUMN_ORDER = columns.length ? Math.max(...columns.map((el) => el.order)) : 0
        this.columnsArray = columns
      })
    )
    this.subscription.push(
      this.actionsSubj.pipe(
        ofType(ActiveBordTypes.CreateColumnFailure,
          ActiveBordTypes.CreateTaskFailure,
          ActiveBordTypes.UpdateColumnFailure,
          ActiveBordTypes.UpdateTaskFailure,
          ActiveBordTypes.DeleteTaskFailure,
          ActiveBordTypes.DeleteColumnFailure)
      ).subscribe(data => {
        this.switchErrorModal()
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.forEach(item => item.unsubscribe());
  }

  get titleColumn(): AbstractControl | null {
    return this.addColumnForm.get('title');
  }

  public createColumn() {
    const order = this.MAX_COLUMN_ORDER + this.INDEX_COEFFICIENT
    const columnRequest: IColumnRequest = {
      title: this.titleColumn?.value,
      order,
    };
    this.apiFacade.createColumn(columnRequest, this.id!);
    this.child?.toggleModal();
  }

  public isLoadingActiveBoard(status: Status) {
    return status === Status.LOADING
  }

  public switchErrorModal(): void {
    this.isErrorModalOn = !this.isErrorModalOn;
  }

  public drop(event: CdkDragDrop<IColumn[]>): void {

    moveItemInArray(this.columnsArray, event.previousIndex, event.currentIndex);

    if (event.previousIndex !== event.currentIndex) {
      const nextItem: number = this.columnsArray[event.currentIndex + 1] ?
        this.columnsArray[event.currentIndex + 1].order :
        this.MAX_COLUMN_ORDER + this.INDEX_COEFFICIENT * 2;
      const prevItem: number = this.columnsArray[event.currentIndex - 1] ?
        this.columnsArray[event.currentIndex - 1].order :
        0;
      let freeIdx: number = Math.round(((nextItem - prevItem) / 2) + prevItem);

      const columnRequest: IColumnRequest = {
        title: this.currentColumn.title,
        order: freeIdx,
      }
      this.apiFacade.updateColumn(this.id!, this.currentColumn.id, columnRequest)
    }
  }

  public setCurrentColumn(column: IColumn) {
    this.currentColumn = column;
  }

  public stopPropagation(evt: Event): void {
    evt.stopPropagation();
  }

  public openAddColumnModal(e: Event, id: string | null): void {
    this.id = id;
    e.stopPropagation();
    this.child?.toggleModal();
  }
}
