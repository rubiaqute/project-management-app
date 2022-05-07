/* eslint-disable ngrx/prefer-action-creator */
import { HttpErrorResponse } from '@angular/common/http';
import { Action, createAction, props } from '@ngrx/store';
import { IBoard, IBoardRequest, IUser } from '../core/models/api.models';

export const getBoards = createAction(
  '[Boards] GET BOARDS FROM API',
  props<{ boards: IBoard[] }>(),
);
export const selectBoard = createAction(
  '[Boards] SELECT BOARD FROM API',
  props<{ board: IBoard }>(),
);
export const activateUser = createAction(
  '[USERS] ACTIVATE USER',
  props<{ activeUser: IUser | null }>(),
);
export const getUsers = createAction(
  '[Users] GET USERS FROM API',
  props<{ users: IUser[] }>(),
);
export const toggleDarkTheme = createAction(
  '[Theme] TOGGLE DARK THEME',
  props<{ isDarkTheme: boolean }>(),
);
export const changeAuthorizedStatus = createAction(
  '[Authorization] IS USER AUTHORIZED',
  props<{ isAuthorized: boolean }>(),
);

export enum ApiTypes {
  GetBoards = '[Boards] GET BOARDS FROM API',
  GetBoardsSuccess = '[Boards] GET BOARDS FROM API SUCCESS',
  GetBoardsFailure = '[Boards] GET BOARDS FROM API FAILURE',

  UpdateBoard = '[Boards] UPDATE BOARD FROM API',
  UpdateBoardSuccess = '[Boards] UPDATE BOARD FROM API SUCCESS',
  UpdateBoardFailure = '[Boards] UPDATE BOARD FROM API FAILURE',

  DeleteBoard = '[Boards] DELETE BOARD FROM API',
  DeleteBoardSuccess = '[Boards] DELETE BOARD FROM API SUCCESS',
  DeleteBoardFailure = '[Boards] DELETE BOARD FROM API FAILURE',

  GetCurrentUser = '[Users] GET USER FROM API',
  GetCurrentUserSuccess = '[Users] GET USER FROM API SUCCESS',
  GetCurrentUserFailure = '[Users] GET USER FROM API FAILURE',

  LogOutUser = '[Users] LOGOUT USER',
}
export class GetBoards implements Action {
  readonly type = ApiTypes.GetBoards;
  constructor() { }
}
export class GetBoardsSuccess implements Action {
  readonly type = ApiTypes.GetBoardsSuccess;
  constructor(public payload: IBoard[]) { }
}
export class GetBoardsFailure implements Action {
  readonly type = ApiTypes.GetBoardsFailure;
  constructor(public payload: HttpErrorResponse) { }
}

export class UpdateBoard implements Action {
  readonly type = ApiTypes.UpdateBoard;
  constructor(public payload: { body: IBoardRequest, id: string }) { }
}
export class UpdateBoardSuccess implements Action {
  readonly type = ApiTypes.UpdateBoardSuccess;
  constructor(public payload: IBoard) { }
}
export class UpdateBoardFailure implements Action {
  readonly type = ApiTypes.UpdateBoardFailure;
  constructor(public payload: HttpErrorResponse) { }
}
export class DeleteBoard implements Action {
  readonly type = ApiTypes.DeleteBoard;
  constructor(public payload: { id: string }) { }
}
export class DeleteBoardSuccess implements Action {
  readonly type = ApiTypes.DeleteBoardSuccess;
  constructor() { }
}
export class DeleteBoardFailure implements Action {
  readonly type = ApiTypes.DeleteBoardFailure;
  constructor(public payload: HttpErrorResponse) { }
}
export class GetCurrentUser implements Action {
  readonly type = ApiTypes.GetCurrentUser;
  constructor(public payload: { id: string }) { }
}
export class GetCurrentUserSuccess implements Action {
  readonly type = ApiTypes.GetCurrentUserSuccess;
  constructor(public payload: IUser) { }
}
export class GetCurrentUserFailure implements Action {
  readonly type = ApiTypes.GetCurrentUserFailure;
  constructor(public payload: HttpErrorResponse) { }
}
export class LogOutUser implements Action {
  readonly type = ApiTypes.LogOutUser;
  constructor() { }
}

export type ApiActions =
  GetBoards |
  GetBoardsSuccess |
  GetBoardsFailure |
  UpdateBoard |
  UpdateBoardSuccess |
  UpdateBoardFailure |
  GetCurrentUser |
  GetCurrentUserSuccess |
  GetCurrentUserFailure |
  LogOutUser |
  DeleteBoard |
  DeleteBoardFailure |
  DeleteBoardSuccess
