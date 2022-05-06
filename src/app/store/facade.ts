import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';


import * as apiSelectors from './selectors';
import * as apiActions from './actions';

import { ApiState } from './state';

@Injectable({ providedIn: 'root' })
export class ApiFacade {
  readonly boards$ = this.store.select(apiSelectors.getBoards);
  constructor(private store: Store<ApiState>) {
  }

  loadBoards(): void {
    this.store.dispatch(new apiActions.GetBoards());
  }

  updateBoardById(body: any, id: string): void {
    this.store.dispatch(new apiActions.UpdateBoard({body, id}));
  }
}
