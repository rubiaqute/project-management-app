import {Component} from '@angular/core';
import {IUser} from "../../models/user.models";
import {UserServices} from "../../services/user.services";
import {BoardServices} from "../../services/board.services"
import {IBoard} from "../../models/board.models";
import {ColumnServices} from "../../services/column.services";
import {IColumn, ITask} from "../../models/column.models";
import {TaskServices} from "../../services/task.services";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isDarkTheme: boolean = false;

  constructor(public userService: UserServices,
              public boardService: BoardServices,
              public columnService: ColumnServices,
              public taskService: TaskServices) {
  }

  public themeChanged(value: any): void {
    this.isDarkTheme = value;
  }

  ngOnInit(): void {
    // this.userService.getUsers().subscribe((items: IUser[]) => console.log(items))
    // this.userService.getUserById('cef50fbe-5fd9-406f-9a6c-8a5b0c888d56')
    // .subscribe((items: IUser) => console.log(items))
    // this.userService.updateUser('cef50fbe-5fd9-406f-9a6c-8a5b0c888d56',
    //   'Vasya', 'user007', 'userpass@12')
    // .subscribe((items: IUser) => console.log(items))

    //this.boardService.getBoards().subscribe((items: IBoard[]) => console.log(items))
    // this.boardService.createBoard('Homework tasks')
    // .subscribe((item: IBoard) => console.log(item))
    // this.boardService.getBoardById('196c7b28-972c-46dc-be72-b6c22cb18b26')
    //   .subscribe((item: IBoard) => console.log(item))
    //
    // this.boardService.updateBoard('196c7b28-972c-46dc-be72-b6c22cb18b26',
    //   'HOMEWORK!!!').subscribe((items: IBoard) => console.log(items))

    // this.columnService.getColumns('196c7b28-972c-46dc-be72-b6c22cb18b26')
    //   .subscribe((items: IColumn) => console.log(items))
    //
    // this.columnService.createColumn('52ed3c95-8aec-4dbd-85b7-7fa684850bf2',
    //   'Done', 1).subscribe((item:IColumn) => console.log(item))

    // this.columnService.getColumnById('196c7b28-972c-46dc-be72-b6c22cb18b26',
    //   'dbc1b1b5-0f48-4192-9cd6-70dfe8b7ab76')
    //   .subscribe((item: IColumn) => console.log(item))
    //
    //     this.columnService.updateColumn('196c7b28-972c-46dc-be72-b6c22cb18b26',
    //   'dbc1b1b5-0f48-4192-9cd6-70dfe8b7ab76', 'Qwerty', 5)
    //   .subscribe((item: IColumn) => console.log(item))

    // this.taskService.getTask('196c7b28-972c-46dc-be72-b6c22cb18b26',
    //   'dbc1b1b5-0f48-4192-9cd6-70dfe8b7ab76')
    //   .subscribe((item: ITask) => console.log(item))
    //
    // this.taskService.createTask('196c7b28-972c-46dc-be72-b6c22cb18b26',
    //   'dbc1b1b5-0f48-4192-9cd6-70dfe8b7ab76', 'Task: pet the cat', 1,
    //   'Domestic cat needs to be stroked gently', '40af606c-c0bb-47d1-bc20-a2857242cde3')
    //   .subscribe((item: ITask) => console.log(item))
  }
}
