import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IBoard, Status } from 'src/app/core/models/api.models';
import { ApiServices } from 'src/app/core/services/api-services.service';
import { Router } from "@angular/router";
import { debounceTime, Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
// import { selectBoards } from "../../../store/selectors";
import { ApiFacade } from 'src/app/store/facade';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardsComponent implements OnInit {
  boards: IBoard[] = [];
  searchStr: string = '';
  subs: Subscription | undefined;
  title: string = '';
  isLoading: Observable<boolean> = this.apiFacade.boardsLoadingStatus$

  public boards$: Observable<IBoard[]> = this.apiFacade.boards$;
  constructor(private apiFacade: ApiFacade, private router: Router) {

  }
  ngOnInit(): void {
    this.apiFacade.loadBoards();
    this.boards$.subscribe((data => {
      if (data) {
        this.boards = Object.assign([], data);
        this.boards.sort((a, b) => a.title.localeCompare(b.title))
      }
    })
    )

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
