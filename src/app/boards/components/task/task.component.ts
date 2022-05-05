import { Component, Input } from '@angular/core';
import { ITask } from 'src/app/core/models/api.models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input()
  public task!: ITask;
}
