import { HttpErrorResponse } from '@angular/common/http';

import { IBoard, IUser, Status } from '../core/models/api.models';

export interface ApiState {

  loadingStatus: Status;
  loadingError?: HttpErrorResponse;
  getBoardsStatus: Status;
  updateBoardStatus: Status;
  deleteBoardStatus: Status;
  boards: IBoard[];
  activeBoard: IBoard | null;
  getActiveUserStatus: Status;
  activeUser: IUser | null,
  users: IUser[];
  isDarkTheme: boolean
}

export const initialApiState: ApiState = {
  loadingStatus: Status.INITIAL,
  getBoardsStatus: Status.INITIAL,
  updateBoardStatus: Status.INITIAL,
  getActiveUserStatus: Status.INITIAL,
  deleteBoardStatus: Status.INITIAL,
  boards: [],
  activeBoard: null,
  activeUser: null,
  users: [],
  isDarkTheme: false

};
