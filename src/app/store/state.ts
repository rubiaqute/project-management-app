import { HttpErrorResponse } from '@angular/common/http';

import { IBoard, IUser, Status } from '../core/models/api.models';

export interface ApiState {

  loadingStatus: Status;
  loadingError?: HttpErrorResponse;
  getBoardsStatus: Status;
  updateBoardStatus: Status;
  boards: IBoard[];
  activeBoard: IBoard | null;
  getActiveUserStatus: Status;
  activeUser: IUser | null,
  isAuthorized: boolean;
  users: IUser[];
  isDarkTheme: boolean
}

export const initialApiState: ApiState = {
  loadingStatus: Status.INITIAL,
  getBoardsStatus: Status.INITIAL,
  updateBoardStatus: Status.INITIAL,
  getActiveUserStatus: Status.INITIAL,
  boards: [],
  activeBoard: null,
  activeUser: null,
  isAuthorized: false,
  users: [],
  isDarkTheme: false

};
