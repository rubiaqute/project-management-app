import {Component, OnInit} from '@angular/core';
import {IBoard} from 'src/app/core/models/api.models';
import {ApiServices} from 'src/app/core/services/api-services';
import {Router} from "@angular/router";
import {debounceTime, Subscription} from "rxjs";
import {getBoards} from "../../../store/actions/boards.actions";
import {Store} from "@ngrx/store";
import {selectBoards} from "../../../store/selectors";

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

  constructor(private api: ApiServices,
              private router: Router,
              private store: Store,
              private apiService: ApiServices) {}

  ngOnInit(): void {
    setTimeout(() => this.store.dispatch(getBoards()), 0);
    this.subs = this.store.select(selectBoards).subscribe((data: IBoard[]) => {
      this.boards = data;
    })
    //this.subs = this.boardsService.getSearch().pipe(debounceTime(2000)).subscribe((searchText) => {
      // this.searchCards(searchText);
    //});
  }

  search(value: string) {
    this.title = value;
  }

  deleteBoard(id: string | null) {
    if (id) {
      this.apiService.deleteBoard(id).subscribe(() => {
          console.log('Board deleted');
        },
        (error) => {
          console.log(error);
        });
    }
    setTimeout(() => this.router.navigateByUrl('/main'), 0);
  }
}
