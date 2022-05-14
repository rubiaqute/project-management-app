import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITask, ITaskRequestUpdate, IUser } from 'src/app/core/models/api.models';
import { ApiServices } from 'src/app/core/services/api-services.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
  @Output()
  public taskChange = new EventEmitter<ITask>();

  @Input()
  public task!: ITask | undefined;

  @Input()
  public boardId!: string;

  @Input()
  public columnId!: string;

  public subs: Subscription[] = [];

  public executor: IUser | undefined;

  public isUserExecutor: boolean = true;

  public isLoaderOn: boolean = false;

  constructor(private api: ApiServices) {}

  ngOnInit(): void {
    this.subs.push(
      this.api.getUserById$(this.task!.userId)
      .subscribe((data) => {
        this.executor = data;

        const userInfo = localStorage.getItem('currentUserRubiaqute');
        const userInfoParsed = JSON.parse(userInfo!);
    
        this.subs.push(
          this.api.getUserById$(userInfoParsed.id)
          .subscribe((data) => {
            const executor = JSON.stringify(this.executor);
            const user = JSON.stringify(data);
            if(executor === user) this.isUserExecutor = false;
          })
          )
      })
      )

  }

  ngOnDestroy(): void {
    this.subs.forEach(item => item.unsubscribe());
  }

  public deleteTask(): void {
    this.subs.push(
      this.api.deleteTask(this.boardId, this.columnId, this.task!.id)
      .subscribe(() => this.task = undefined)
    )
  }

  public switchCompleteFlag():void {
    const taskRequest: ITaskRequestUpdate = {
      title: this.task!.title,
      done: !(this.task!.done),
      order: this.task!.order,
      description: this.task!.description,
      userId: this.task!.userId,
      boardId: this.boardId,
      columnId: this.columnId
      }

    this.switchLoader();

    this.subs.push(
      this.api.updateTask(this.boardId, 
                          this.columnId,
                          this.task!.id, 
                          taskRequest)
        .subscribe((data) => {
          this.task = data;
          this.taskChange.emit(this.task);
          this.switchLoader();
        }));
  }

  public stopPropagation(evt: Event): void {
    evt.stopPropagation();
  }

  public switchLoader(): void {
    this.isLoaderOn = !this.isLoaderOn;
  }
}
