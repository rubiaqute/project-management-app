import { Component, OnInit } from '@angular/core';
import { IBoard } from 'src/app/core/models/api.models';
import { ApiServices } from 'src/app/core/services/api-services';
import { Router } from "@angular/router";
import { debounceTime, Observable, Subscription } from "rxjs";
import { getBoards } from "../../../store/actions/boards.actions";
import { Store } from "@ngrx/store";
// import { selectBoards } from "../../../store/selectors";
import { ApiFacade } from 'src/app/store/facade';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  boards: IBoard[] = [];
  searchStr: string = '';
  subs: Subscription | undefined;
  title: string = '';

  // ngOnInit(): void {
  //   setTimeout(() => this.store.dispatch(getBoards()), 0);
  //   this.subs = this.store.select(selectBoards).subscribe((data: IBoard[]) => {
  //     this.boards = data;
  //   })
  //
  // }
  // boards: IBoard[] = []
  public boards$: Observable<IBoard[]> = this.apiFacade.boards$;
  constructor(private apiFacade: ApiFacade, private router: Router) {

  }
  ngOnInit(): void {
    this.apiFacade.loadBoards();
    this.boards$.subscribe((data => console.log(data)))
    // this.subs = this.boardsService.getSearch().pipe(debounceTime(2000)).subscribe((searchText) => {
    //   // this.searchCards(searchText);
    // //});
    // this.api.getBoards().subscribe((data) => this.boards = data)
  }

  search(value: string) {
    this.title = value;
  }
  deleteBoard(id: string | null, e: Event) {
    e.stopPropagation()
    if (id) {
      this.apiFacade.deleteBoardById(id)
    }
  }
}
