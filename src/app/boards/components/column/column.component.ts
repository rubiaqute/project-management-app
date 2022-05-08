import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IColumn, IColumnRequest, ITask, ITaskRequest, IUser } from 'src/app/core/models/api.models';
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
  public column: IColumn | undefined;

  public tasks: ITask[] = []

  public MAX_TASK_ORDER: number = -1;
  
  public isTitleEditMode: boolean = false;  

  public title: string | undefined;

  public description: string | undefined;

  public isTaskModalOn: boolean = false;

  public isErrorModalOn: boolean = false;

  public subs: Subscription[] = [];

  public users: IUser[] = []; // NEED TO UP ON MAIN COMP OR SERVICE

  public userExecutor: IUser | undefined;

  constructor(private api: ApiServices) {}

  ngOnInit(): void {
    this.subs.push(this.api.getUsers().subscribe((data) => this.users = data));
    if (this.column!.tasks) this.tasks = [...this.column!.tasks];
    this.tasks.sort((a,b) => a.order - b.order);
    this.MAX_TASK_ORDER = this.tasks.slice(-1)[0] ?
                          this.tasks.slice(-1)[0].order :
                          -1;
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
    const taskRequest: ITaskRequest = {
      title: this.title!,
      order: ++this.MAX_TASK_ORDER,
      description: this.description!,
      userId: this.userExecutor!.id,
    };

    this.api
      .createTask(this.boardId,
                  this.column!.id,
                  taskRequest)
      .subscribe((data) => this.tasks.push(data));
  }
  
  public drop(event: CdkDragDrop<ITask[]>): void {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
}
