import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IColumn, IColumnRequest, ITask, ITaskRequest, ITaskRequestUpdate, IUser } from 'src/app/core/models/api.models';
import { ApiFacade } from 'src/app/store/facade';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit, OnDestroy {
  @Input()
  public boardId!: string;

  @Input()
  public column!: IColumn;

  @Output()
  public currentTaskChange = new EventEmitter<ITask>();

  @Input()
  public currentTask: ITask | undefined;

  @Output()
  public prevColumnChange = new EventEmitter<IColumn>();

  @Input()
  public prevColumn: IColumn | undefined;

  public users$: Observable<IUser[]> = this.apiFacade.users$
  public users: IUser[] = []
  public isTitleEditMode: boolean = false;

  public title: string | undefined;

  public description: string | undefined;

  public isAddTaskModalOn: boolean = false;

  public isTaskDetailsModalOn: boolean = false;

  public isEditTaskModalOn: boolean = false;

  public isErrorModalOn: boolean = false;

  public subs: Subscription[] = [];

  public userExecutor: IUser | undefined;

  public MAX_TASK_ORDER: number = 0;

  public INDEX_COEFFICIENT: number = 100000000;

  public isLoaderOn: boolean = false;

  constructor(private apiFacade: ApiFacade) { }

  ngOnInit(): void {
    this.MAX_TASK_ORDER = this.column!.tasks?.slice(-1)[0]
      ? this.column!.tasks?.slice(-1)[0].order
      : 0;
    this.users$.subscribe((data) => this.users = data)
  }

  ngOnDestroy(): void {
    this.subs.forEach(item => item.unsubscribe());
  }

  public switchTitleEdit(): void {
    this.title = this.column!.title;
    this.isTitleEditMode = !this.isTitleEditMode;
  }

  public deleteColumn(): void {
    this.apiFacade.deleteColumn(this.boardId, this.column.id)
  }

  public setColumnTitle(newTitle: string): void {
    if (!newTitle || !newTitle.trim()) newTitle = '**';
    const columnRequest: IColumnRequest = {
      title: newTitle,
      order: this.column!.order
    }
    this.apiFacade.updateColumn(this.boardId, this.column.id, columnRequest)
    this.switchTitleEdit();
  }

  public switchTaskModal(mode: string = 'edit'): void {
    if (mode === 'add') {
      this.isAddTaskModalOn = !this.isAddTaskModalOn
      this.title = '';
      this.description = '';
      this.userExecutor = undefined;
      this.isTaskDetailsModalOn = false;
    } else {
      this.isEditTaskModalOn = !this.isEditTaskModalOn;
      this.title = this.currentTask?.title;
      this.description = this.currentTask?.description;
      this.isTaskDetailsModalOn = false;
    }

  }

  public switchErrorModal(): void {
    this.isErrorModalOn = !this.isErrorModalOn;
  }

  public switchTaskDetailsModal(): void {
    this.isTaskDetailsModalOn = !this.isTaskDetailsModalOn;
  }

  public createTask(title: string, description: string): void {
    this.MAX_TASK_ORDER = this.MAX_TASK_ORDER + this.INDEX_COEFFICIENT;

    const taskRequest: ITaskRequest = {
      title: this.title!,
      done: false,
      order: this.MAX_TASK_ORDER,
      description: this.description!,
      userId: this.userExecutor!.id,
    };

    this.apiFacade.createTask(this.boardId, this.column.id, taskRequest)
  }

  public editTask(title: string, description: string): void {

    const taskRequest: ITaskRequestUpdate = {
      title: this.title!,
      done: this.currentTask!.done,
      order: this.currentTask!.order,
      description: this.description!,
      userId: this.userExecutor!.id,
      boardId: this.boardId,
      columnId: this.column!.id,
    };

    this.apiFacade.updateTask(this.boardId, this.column.id, this.currentTask!.id, taskRequest)
  }

  public drop(event: CdkDragDrop<ITask[]>): void {

    const nextItem: number = this.column!.tasks![event.currentIndex + 1]
      ? this.column!.tasks![event.currentIndex + 1].order
      : this.MAX_TASK_ORDER + this.INDEX_COEFFICIENT * 2;
    const prevItem: number = this.column!.tasks![event.currentIndex - 1]
      ? this.column!.tasks![event.currentIndex - 1].order
      : 0;
    let freeIdx: number = Math.round(((nextItem - prevItem) / 2) + prevItem);



    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      if (event.previousIndex !== event.currentIndex) {
        const taskRequest: ITaskRequestUpdate = {
          title: this.currentTask!.title,
          done: this.currentTask!.done,
          order: freeIdx,
          description: this.currentTask!.description,
          userId: this.currentTask!.userId,
          boardId: this.boardId,
          columnId: this.column!.id,
        }
        this.apiFacade.updateTask(this.boardId,
          this.column!.id,
          this.currentTask!.id,
          taskRequest)
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const orderArray: ITask[] = Object.assign([], this.column.tasks)
      const taskRequest: ITaskRequest = {
        title: this.currentTask!.title,
        done: this.currentTask!.done,
        order: Math.max(...orderArray.map((el) => el.order)) + this.INDEX_COEFFICIENT,
        description: this.currentTask!.description,
        userId: this.currentTask!.userId,
      }
      this.apiFacade.deleteTask(this.boardId, this.prevColumn!.id, this.currentTask!.id)
      this.apiFacade.createTask(this.boardId, this.column.id, taskRequest)
    }
  }

  public setCurrentTask(task: ITask,): void {
    this.currentTask = task;
    this.currentTaskChange.emit(task);
    this.userExecutor = this.users.find((el) => el.id === task.userId)

  }

  public setPrevColumn(column: IColumn): void {
    this.prevColumnChange.emit(column);
  }

  public switchLoader(): void {
    this.isLoaderOn = !this.isLoaderOn;
  }
}
