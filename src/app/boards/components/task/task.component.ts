import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask, ITaskRequestUpdate, IUser } from 'src/app/core/models/api.models';
import { ApiFacade } from 'src/app/store/facade';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Output()
  public taskChange = new EventEmitter<ITask>();

  @Input()
  public task!: ITask | undefined;

  @Input()
  public boardId!: string;

  @Input()
  public columnId!: string;

  public activeUser$: Observable<IUser | null> = this.apiFacade.activeUser$;
  public users$: Observable<IUser[]> = this.apiFacade.users$

  constructor(private apiFacade: ApiFacade) { }

  public deleteTask(): void {
    this.apiFacade.deleteTask(this.boardId, this.columnId, this.task!.id)
  }
  getExecutorName(users?: IUser[] | null) {
    return users?.find((el) => el.id === this.task?.userId)?.name
  }

  public switchCompleteFlag(): void {
    const taskRequest: ITaskRequestUpdate = {
      title: this.task!.title,
      done: !(this.task!.done),
      order: this.task!.order,
      description: this.task!.description,
      userId: this.task!.userId,
      boardId: this.boardId,
      columnId: this.columnId
    }
    this.apiFacade.updateTask(this.boardId, this.columnId, this.task!.id, taskRequest)
  }

  public stopPropagation(evt: Event): void {
    evt.stopPropagation();
  }

}
