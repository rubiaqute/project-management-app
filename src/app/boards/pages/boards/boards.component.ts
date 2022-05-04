import { Component, OnInit } from '@angular/core';
import { IBoard } from 'src/app/core/models/api.models';
import { ApiServices } from 'src/app/core/services/api-services';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  boards: IBoard[] = []

  constructor(private api: ApiServices) {

  }
  ngOnInit(): void {
    this.api.getBoards().subscribe((data) => this.boards = data)
  }
}
