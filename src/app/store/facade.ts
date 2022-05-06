import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';


import * as apiSelectors from './selectors';
import * as apiActions from './actions';

import { ApiState } from './state';

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

  updateBoardById(body: any, id: string): void {
    this.store.dispatch(new apiActions.UpdateBoard({ body, id }));
  }
}
