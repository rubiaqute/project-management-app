import { HttpErrorResponse } from '@angular/common/http';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { AsyncActionStatus, IBoard, Status } from '../core/models/api.models';

export interface EntityInAction {
  id: string;
  type: AsyncActionStatus;
}

export interface ApiState extends EntityState<any> {
  loadingStatus: Status;
  loadingError?: HttpErrorResponse;
  getBoardsStatus: Status;
  updateBoardStatus: Status;
  updateError?: any;
  boards: EntityState<IBoard>;
  boardsInAction: EntityInAction[];
}

export const ApiAdapter: EntityAdapter<any> = createEntityAdapter<any>({
  selectId: state => state.id,
  sortComparer: (d1, d2) => (d1.id === d2.id ? 0 : d1.id < d2.id ? -1 : 1)
});

export const boardsAdapter: EntityAdapter<IBoard> = createEntityAdapter<IBoard>({
  selectId: board => board.id,
  sortComparer: (d1: IBoard, d2: IBoard) => (d1.id === d2.id ? 0 : d1.id < d2.id ? -1 : 1)
});

export const initialApiState: ApiState = ApiAdapter.getInitialState({
  loadingStatus: Status.INITIAL,
  getBoardsStatus: Status.INITIAL,
  boardsInAction: [],
  updateBoardStatus: Status.INITIAL,
  boards: boardsAdapter.getInitialState()
});
