import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IColumn, IColumnRequest, ITask, ITaskRequest, ITaskRequestUpdate, IUser } from 'src/app/core/models/api.models';
import { ApiServices } from 'src/app/core/services/api-services';

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

  public isTaskModalOn: boolean = false;

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
    this.column!.tasks!.sort((a,b) => a.order - b.order);
    this.MAX_TASK_ORDER = this.column!.tasks!.slice(-1)[0]
                            ? this.column!.tasks!.slice(-1)[0].order
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
    this.api.deleteColumn(this.boardId, this.column!.id)
      .subscribe(() => this.column = undefined);
  } 

  public setColumnTitle(newTitle: string): void {
    if (!newTitle || !newTitle.trim()) newTitle = '**';
    const columnRequest: IColumnRequest = {
      title: newTitle,
      order: this.column!.order
    }
    this.api.updateColumn(this.boardId,
                          this.column!.id,
                          columnRequest)
      .subscribe((data) => this.column = data);
    this.switchTitleEdit();
  }

  public switchAddTaskModal(): void {
    this.isTaskModalOn = !this.isTaskModalOn;
    this.title = '';
    this.description = '';
    this.userExecutor = undefined;
  }

  public switchErrorModal(): void {
    this.isErrorModalOn = !this.isErrorModalOn;
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

    this.api
      .createTask(this.boardId,
                  this.column!.id,
                  taskRequest)
      .subscribe((data) => this.column!.tasks!.push(data));
  }
  
  public drop(event: CdkDragDrop<ITask[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      if (event.previousIndex !== event.currentIndex) {
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
          
        this.isLoaderOn = true;
  
        this.api.updateTask(this.boardId,
                            this.column!.id,
                            this.currentTask!.id, 
                            taskRequest)
          .subscribe(
            (data) => {
              this.column!.tasks!.splice(event.currentIndex, 1, data)
              this.isLoaderOn = false;
            },
            (err) => {
              this.switchErrorModal();
              this.isLoaderOn = false;
            });
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

        // console.log(
        //   event.previousContainer.data,
        //   event.container.data,
        //   event.previousIndex,
        //   event.currentIndex,)

          // console.log(this.column);
          // console.log(this.prevColumn);

        // this.api.deleteTask(this.boardId, this.prevColumn!.id, this.currentTask!.id)
        //   .subscribe(() => {
        //     const currentTaskIdx = this.column!.tasks!.indexOf(this.currentTask!);
        //     this.column!.tasks!.splice(currentTaskIdx, 1);
        //   });

        
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
        
        this.isLoaderOn = true;

        this.api.updateTask(this.boardId,
                            this.prevColumn!.id,
                            this.currentTask!.id,
                            taskRequest)
          .subscribe(
            (data) => {
              this.column!.tasks!.splice(event.currentIndex, 1, data);
              this.isLoaderOn = false;
            },
            (err) => {
              this.switchErrorModal();
              this.isLoaderOn = false;
            });

        // const nextItem: number = this.column!.tasks![event.currentIndex + 1]
        //                           ? this.column!.tasks![event.currentIndex + 1].order
        //                           : this.MAX_TASK_ORDER + this.INDEX_COEFFICIENT * 2;
        // const prevItem: number = this.column!.tasks![event.currentIndex - 1]
        //                           ? this.column!.tasks![event.currentIndex - 1].order
        //                           : 0;
        // let freeIdx: number = Math.round(((nextItem - prevItem) / 2) + prevItem);
  
        // const taskRequest: ITaskRequestUpdate = {
        //   title: this.currentTask.title,
        //   done: this.currentTask.done,
        //   order: freeIdx,
        //   description: this.currentTask.description,
        //   userId: this.currentTask.userId,
        //   boardId: this.boardId,
        //   columnId: this.column!.id,
        // }
          
        // // this.isLoaderOn = true;
  
        // this.api.updateTask(this.boardId,
        //                     this.column!.id,
        //                     this.currentTask.id, 
        //                     taskRequest)
        //   .subscribe(
        //     (data) => {
        //       this.column!.tasks!.splice(event.currentIndex, 1, data)
        //       // this.isLoaderOn = false;
        //     },
        //     (err) => {
        //       this.switchErrorModal();
        //       // this.isLoaderOn = false;
        //     });
    }
  }

  public setCurrentTask(task: ITask): void {
    this.currentTaskChange.emit(task);
  }

  public setPrevColumn(column: IColumn): void {
    this.prevColumnChange.emit(column);
  }
}
