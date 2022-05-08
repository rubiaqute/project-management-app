import { HttpErrorResponse } from '@angular/common/http';

import { IBoard, IUser, Status } from '../core/models/api.models';


export interface CurrentUserState {
  loadingStatus: Status;
  loadingError?: HttpErrorResponse;
  activeUserStatus: Status;
  activeUser: IUser | null,
}
export const initialCurrentUserState: CurrentUserState = {
  loadingStatus: Status.INITIAL,
  activeUser: null,
  activeUserStatus: Status.INITIAL,
};


export interface BoardsState {

  loadingStatus: Status;
  loadingError?: HttpErrorResponse;
  getBoardsStatus: Status;
  updateBoardStatus: Status;
  deleteBoardStatus: Status;
  createBoardStatus: Status;
  boards: IBoard[];
}
export const initialBoardsState: BoardsState = {

  loadingStatus: Status.INITIAL,
  getBoardsStatus: Status.INITIAL,
  updateBoardStatus: Status.INITIAL,
  deleteBoardStatus: Status.INITIAL,
  createBoardStatus: Status.INITIAL,
  boards: []
}

export interface ActiveBoardState {
  loadingStatus: Status;
  loadingError?: HttpErrorResponse;
  getActiveBoardStatus: Status;
  getCreateColumnStatus: Status;
  activeBoard: IBoard | null;
}
export const initialActiveBoardState: ActiveBoardState = {
  loadingStatus: Status.INITIAL,
  getActiveBoardStatus: Status.INITIAL,
  getCreateColumnStatus: Status.INITIAL,
  activeBoard: null,
}


