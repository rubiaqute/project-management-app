import { Component } from '@angular/core';
import {IUser} from "../../models/user.models";
import {UserServices} from "../../services/user.services";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isDarkTheme: boolean = false;

  constructor(public userService: UserServices) { }

  public themeChanged(value: any): void {
    this.isDarkTheme = value;
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((items: IUser[]) => console.log(items))
    this.userService.getUserById('cef50fbe-5fd9-406f-9a6c-8a5b0c888d56').subscribe((items: IUser) => console.log(items))
    this.userService.changeUser('cef50fbe-5fd9-406f-9a6c-8a5b0c888d56').subscribe((items: IUser) => console.log(items))
  }
}
