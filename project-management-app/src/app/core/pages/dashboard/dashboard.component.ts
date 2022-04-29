import {Component} from '@angular/core';
import {IUser} from "../../models/user.models";
import {UserServices} from "../../services/user.services";
import {BoardServices} from "../../services/board.services"
import {IBoard} from "../../models/board.models";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isDarkTheme: boolean = false;

  constructor(public userService: UserServices,
              public boardService: BoardServices) {
  }

  public themeChanged(value: any): void {
    this.isDarkTheme = value;
  }

  ngOnInit(): void {
    // this.userService.getUsers().subscribe((items: IUser[]) => console.log(items))
    // this.userService.getUserById('cef50fbe-5fd9-406f-9a6c-8a5b0c888d56')
    // .subscribe((items: IUser) => console.log(items))
    // this.userService.changeUser('cef50fbe-5fd9-406f-9a6c-8a5b0c888d56',
    //   'Vasya', 'user007', 'userpass@12')
    // .subscribe((items: IUser) => console.log(items))

    //this.boardService.getBoards().subscribe((items: IBoard[]) => console.log(items))
    // this.boardService.createBoard('Homework tasks')
    // .subscribe((item: IBoard) => console.log(item))
    this.boardService.getBoardById('196c7b28-972c-46dc-be72-b6c22cb18b26')
      .subscribe((item: IBoard) => console.log(item))

    this.boardService.updateBoard('196c7b28-972c-46dc-be72-b6c22cb18b26',
      'HOMEWORK!!!').subscribe((items: IBoard) => console.log(items))
  }
}
