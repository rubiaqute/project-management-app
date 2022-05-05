import {Component, OnInit} from '@angular/core';
import {IBoard} from 'src/app/core/models/api.models';
import {ApiServices} from 'src/app/core/services/api-services';
import {Router} from "@angular/router";

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  boards: IBoard[] = []

  constructor(private api: ApiServices,
              private router: Router,
              private apiService: ApiServices) {}

  ngOnInit(): void {
    this.api.getBoards().subscribe((boards: IBoard[]) => {
      this.boards = boards;
      // console.log(data.map(el => el.id))
      localStorage.setItem('boards', JSON.stringify(boards))
    })
  }

  deleteBoard() {
    const user = JSON.parse(localStorage.getItem('currentUserRubiaqute')!)
    if (user) {
      this.apiService.deleteUser(user.id).subscribe(() => {
          console.log('Board deleted');
        },
        (error) => {
          console.log(error);
          //Here you can insert the window "User deleted"
        });
    }
  }
}
