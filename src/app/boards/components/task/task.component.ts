import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITask, IUser } from 'src/app/core/models/api.models';
import { ApiServices } from 'src/app/core/services/api-services';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
  @Input()
  public task!: ITask;

  public subs: Subscription[] = [];

  public executor: IUser | undefined;

  constructor(private api: ApiServices) {}

  ngOnInit(): void {
    this.api.getUserById(this.task.userId)
    .subscribe((data) => this.executor = data);
  }

  ngOnDestroy(): void {
    this.subs.forEach(item => item.unsubscribe());
  }
}
