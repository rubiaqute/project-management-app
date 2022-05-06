import { HttpErrorResponse } from '@angular/common/http';
import { Action, createAction, props } from '@ngrx/store';
import { IBoard, IUser } from '../core/models/api.models';

// export const getBoards = createAction(
//   '[Boards] GET BOARDS FROM API',
//   props<{ boards: IBoard[] }>(),
// );
// export const getBoardsFailure = createAction(
//   '[Boards] GET BOARDS FROM API FAILURE',

//   props<Error>(),
// );
export enum ApiTypes {
  GetBoards = '[Boards] GET BOARDS FROM API',
  GetBoardsSuccess = '[Boards] GET BOARDS FROM API SUCCESS',
  GetBoardsFailure = '[Boards] GET BOARDS FROM API FAILURE',

  UpdateBoard = '[Boards] UPDATE BOARD FROM API',
  UpdateBoardSuccess = '[Boards] UPDATE BOARD FROM API SUCCESS',
  UpdateBoardFailure = '[Boards] UPDATE BOARD FROM API FAILURE'
}
export class GetBoards implements Action {
  readonly type = ApiTypes.GetBoards;
  constructor() {}
}
export class GetBoardsSuccess implements Action {
  readonly type = ApiTypes.GetBoardsSuccess;
  constructor(public payload: IBoard[]) {}
}
export class GetBoardsFailure implements Action {
  readonly type = ApiTypes.GetBoardsFailure;
  constructor(public payload: HttpErrorResponse) {}
}

export class UpdateBoard implements Action {
  readonly type = ApiTypes.UpdateBoard;
  constructor(public payload: { body: any, id: string}) {}
}
export class UpdateBoardSuccess implements Action {
  readonly type = ApiTypes.UpdateBoardSuccess;
  constructor(public payload: IBoard) {}
}
export class UpdateBoardFailure implements Action {
  readonly type = ApiTypes.UpdateBoardFailure;
  constructor(public payload: HttpErrorResponse) {}
}

export type ApiActions = 
  GetBoards |
  GetBoardsSuccess |
  GetBoardsFailure |
  UpdateBoard |
  UpdateBoardSuccess |
  UpdateBoardFailure;

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

