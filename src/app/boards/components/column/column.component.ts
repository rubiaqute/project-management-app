import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IColumn, IColumnRequest, ITask, ITaskRequest, ITaskRequestUpdate, IUser } from 'src/app/core/models/api.models';
import { ApiServices } from 'src/app/core/services/api-services.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit, OnDestroy {
  @Input()
  public boardId!: string;

  @Input()
  public column!: IColumn | undefined;

  @Output()
  public currentTaskChange = new EventEmitter<ITask>();

  @Input()
  public currentTask: ITask | undefined;

  @Output()
  public prevColumnChange = new EventEmitter<IColumn>();

  @Input()
  public prevColumn: IColumn | undefined;

  public isTitleEditMode: boolean = false;  

  public title: string | undefined;

  public description: string | undefined;

  public isAddTaskModalOn: boolean = false;

  public isTaskDetailsModalOn: boolean = false;

  public isEditTaskModalOn: boolean = false;

  public isErrorModalOn: boolean = false;

  public subs: Subscription[] = [];

  public users: IUser[] = []; // NEED TO UP ON MAIN COMP OR SERVICE

  public userExecutor: IUser | undefined;

  public MAX_TASK_ORDER: number = 0;

  public INDEX_COEFFICIENT: number = 100000000;

  public isLoaderOn: boolean = false;

  constructor(private api: ApiServices) {}

  ngOnInit(): void {
    this.subs.push(this.api.getUsers().subscribe((data) => this.users = data));
    this.column!.tasks 
      ? this.column!.tasks
      : [];
    this.column!.tasks?.sort((a,b) => a.order - b.order);
    this.MAX_TASK_ORDER = this.column!.tasks?.slice(-1)[0]
                            ? this.column!.tasks?.slice(-1)[0].order
                            : 0;
  }

  ngOnDestroy(): void {
    this.subs.forEach(item => item.unsubscribe());
  }

  public switchTitleEdit(): void {
    this.title = this.column!.title;
    this.isTitleEditMode = !this.isTitleEditMode;
  }

  public deleteColumn(): void {
    this.subs.push(this.api.deleteColumn(this.boardId, this.column!.id)
      .subscribe(() => this.column = undefined));
  } 

  public setColumnTitle(newTitle: string): void {
    if (!newTitle || !newTitle.trim()) newTitle = '**';
    const columnRequest: IColumnRequest = {
      title: newTitle,
      order: this.column!.order
    }
    this.subs.push(this.api.updateColumn(this.boardId,
                          this.column!.id,
                          columnRequest)
      .subscribe((data) => this.column = data));
    this.switchTitleEdit();
  }

  public switchTaskModal(evt: Event, mode: string = 'edit'): void {
    evt.stopPropagation();
    mode === 'add' 
      ? this.isAddTaskModalOn = !this.isAddTaskModalOn
      : this.isEditTaskModalOn = !this.isEditTaskModalOn;
    this.title = '';
    this.description = '';
    this.userExecutor = undefined;
    this.isTaskDetailsModalOn = false;
  }

  public switchErrorModal(evt: Event): void {
    evt.stopPropagation();
    this.isErrorModalOn = !this.isErrorModalOn;
  }

  public switchTaskDetailsModal(evt: Event): void {
    evt.stopPropagation();
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

    this.subs.push(this.api
      .createTask(this.boardId,
                  this.column!.id,
                  taskRequest)
      .subscribe((data) => this.column!.tasks!.push(data)));
  }

  public editTask(title: string, description: string): void {
    this.MAX_TASK_ORDER = this.MAX_TASK_ORDER + this.INDEX_COEFFICIENT;

    const taskRequest: ITaskRequestUpdate = {
      title: this.title!,
      done: this.currentTask!.done,
      order: this.MAX_TASK_ORDER,
      description: this.description!,
      userId: this.userExecutor!.id,
      boardId: this.boardId,
      columnId: this.column!.id,
    };

    const idx = this.column?.tasks?.findIndex((task) => task.id === this.currentTask!.id);

    this.switchLoader();
    
    this.subs.push(this.api.updateTask(this.boardId,
                                       this.column!.id,
                                       this.currentTask!.id,
                                       taskRequest)
      .subscribe(
      (data) => {
        this.column!.tasks!.splice(idx!, 1, data);
        this.switchLoader();
      }));
  }
  
  public drop(event: CdkDragDrop<ITask[]>): void {
    
    const nextItem: number = this.column!.tasks![event.currentIndex + 1]
                              ? this.column!.tasks![event.currentIndex + 1].order
                              : this.MAX_TASK_ORDER + this.INDEX_COEFFICIENT * 2;
    const prevItem: number = this.column!.tasks![event.currentIndex - 1]
                              ? this.column!.tasks![event.currentIndex - 1].order
                              : 0;
    let freeIdx: number = Math.round(((nextItem - prevItem) / 2) + prevItem);

    const taskRequest: ITaskRequestUpdate = {
    title: this.currentTask!.title,
    done: this.currentTask!.done,
    order: freeIdx,
    description: this.currentTask!.description,
    userId: this.currentTask!.userId,
    boardId: this.boardId,
    columnId: this.column!.id,
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      if (event.previousIndex !== event.currentIndex) {          
        this.switchLoader();
  
        this.subs.push(this.api.updateTask(this.boardId,
                            this.column!.id,
                            this.currentTask!.id, 
                            taskRequest)
          .subscribe(
            (data) => {
              this.column!.tasks!.splice(event.currentIndex, 1, data);
              this.switchLoader();
            }));
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
        
        this.switchLoader();

        this.subs.push(this.api.updateTask(this.boardId,
                            this.prevColumn!.id,
                            this.currentTask!.id,
                            taskRequest)
          .subscribe(
            (data) => {
              this.column!.tasks!.splice(event.currentIndex, 1, data);
              this.switchLoader();
            }));
    }
  }

  public setCurrentTask(task: ITask): void {
    this.currentTask = task;
    this.currentTaskChange.emit(task);
    this.subs.push(
      this.api.getUserById$(task.userId)
      .subscribe((data) => this.userExecutor = data)
      )
  }

  public setPrevColumn(column: IColumn): void {
    this.prevColumnChange.emit(column);
  }

  public switchLoader(): void {
    this.isLoaderOn = !this.isLoaderOn;
  }
}
