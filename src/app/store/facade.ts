import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';


import * as currentUserSelectors from './selectors/current-user.selectors';
import * as activeBoardSelectors from './selectors/active-board.selectors';
import * as boardsSelectors from './selectors/boards.selectors';
import * as currentUserActions from './actions/actions';
import * as activeBoardActions from './actions/current-user.actions';
import * as boardsActions from './actions/boards.actions';

import { IBoardRequest } from '../core/models/api.models';

@Injectable({ providedIn: 'root' })
export class ApiFacade {
  readonly boards$ = this.store.select(boardsSelectors.selectBoards);
  readonly activeUser$ = this.store.select(currentUserSelectors.selectCurrentUser);
  readonly activeBoard$ = this.store.select(activeBoardSelectors.selectActiveBoard);
  constructor(private store: Store) {
  }

  loadBoards(): void {
    this.store.dispatch(new boardsActions.GetBoards());
  }
  logOutUser(): void {
    this.store.dispatch(new currentUserActions.LogOutUser());
  }

  setUser(id: string): void {
    this.store.dispatch(new currentUserActions.GetCurrentUser({ id }));
  }

  createBoard(body: IBoardRequest): void {
    this.store.dispatch(new boardsActions.CreateBoard({ body }));
  }
  updateBoardById(body: IBoardRequest, id: string): void {
    this.store.dispatch(new boardsActions.UpdateBoard({ body, id }));
  }

  deleteBoardById(id: string): void {
    this.store.dispatch(new boardsActions.DeleteBoard({ id }));
  }

  getActiveBoard(id: string): void {
    this.store.dispatch(new activeBoardActions.GetActiveBoard(id));
  }
}
