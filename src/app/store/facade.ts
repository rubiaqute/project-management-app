import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';


import * as apiSelectors from './selectors';
import * as apiActions from './actions';

import { ApiState } from './state';
import { IBoardRequest } from '../core/models/api.models';

@Injectable({ providedIn: 'root' })
export class ApiFacade {
  readonly boards$ = this.store.select(apiSelectors.selectBoards);
  readonly activeUser$ = this.store.select(apiSelectors.selectCurrentUser);
  constructor(private store: Store<ApiState>) {
  }

  loadBoards(): void {
    this.store.dispatch(new apiActions.GetBoards());
  }
  logOutUser(): void {
    this.store.dispatch(new apiActions.LogOutUser());
  }

  setUser(id: string): void {
    this.store.dispatch(new apiActions.GetCurrentUser({ id }));
  }

  updateBoardById(body: IBoardRequest, id: string): void {
    this.store.dispatch(new apiActions.UpdateBoard({ body, id }));
  }

  deleteBoardById(id: string): void {
    this.store.dispatch(new apiActions.DeleteBoard({ id }));
    this.store.dispatch(new apiActions.GetBoards());
  }
}
