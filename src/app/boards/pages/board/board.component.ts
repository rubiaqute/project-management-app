import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IBoard, IColumn, ITaskRequest } from 'src/app/core/models/api.models';
import { ApiFacade } from 'src/app/store/facade';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
  public id: string | undefined;
  public activeBoard: Observable<IBoard | null> = this.apiFacade.activeBoard$
  public subscription: Subscription[] = [];
  columns: IColumn[] = [];
  public isTitleEditMode: boolean = false;
  constructor(private activateRoute: ActivatedRoute, private apiFacade: ApiFacade) { }

  ngOnInit(): void {
    this.subscription.push(
      this.activateRoute.params.subscribe(
        (params: { [x: string]: string | undefined }) => {
          this.id = params['id']
          this.apiFacade.getActiveBoard(this.id!)
          this.activeBoard.subscribe((data) => {
            if (data?.columns) {
              this.columns = Object.assign([], data?.columns!)
              this.columns.sort((a, b) => a.order - b.order)
            }
          })
        }

      )
    );
  }
  addColumn() {
    const column = {
      title: "Newby",
      order: 3
    }
    this.apiFacade.createColumn(column, this.id!)
  }
  updateColumn(columnId: string) {
    const column = {
      title: "Ингина Колонка",
      order: 2
    }
    this.apiFacade.updateColumn(this.id!, columnId, column)
  }
  deleteColumn(columnId: string) {
    this.apiFacade.deleteColumn(this.id!, columnId)
  }

  createTask(columnId: string) {
    const task: ITaskRequest = {
      title: "Задание 1",
      order: 1,
      description: "Очень важное задание",
      userId: "a0b4565c-a6ad-4428-b6bb-a1bb4261d82f",
    }

    this.apiFacade.createTask(this.id!, columnId, task)
  }
  updateTask(columnId: string) {
    const task: ITaskRequest = {
      title: "Новое задание",
      order: 2,
      description: "Ага,Очень важное задание",
      userId: "a0b4565c-a6ad-4428-b6bb-a1bb4261d82f",
      boardId: this.id,
      columnId: columnId
    }
    const taskId = "64de1553-8ef6-4c01-a994-84474c4a7710"
    this.apiFacade.updateTask(this.id!, columnId, taskId, task)
  }
  deleteTask(columnId: string) {
    const taskId = "64de1553-8ef6-4c01-a994-84474c4a7710"
    this.apiFacade.deleteTask(this.id!, columnId, taskId)
  }
  public openTitleEdit() {
    this.isTitleEditMode = true;
  }

  public closeTitleEdit() {
    this.isTitleEditMode = false;
  }
}
