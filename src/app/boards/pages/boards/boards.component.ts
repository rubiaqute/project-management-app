import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from 'src/app/core/models/api.models';
// import { ApiServices } from 'src/app/core/services/api-services';
import { ApiFacade } from 'src/app/store/facade';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  // boards: IBoard[] = []
  public boards$: Observable<IBoard[]> = this.apiFacade.boards$;
  constructor(private apiFacade: ApiFacade) {

  }
  ngOnInit(): void {
    this.apiFacade.loadBoards();
    // this.api.getBoards().subscribe((data) => this.boards = data)
  }
}
