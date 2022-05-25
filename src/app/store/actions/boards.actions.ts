/* eslint-disable ngrx/prefer-action-creator */
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { IBoard, IBoardRequest } from '../../core/models/api.models';

export enum BoardsTypes {
  GetBoards = '[Boards] GET BOARDS FROM API',
  GetBoardsSuccess = '[Boards] GET BOARDS FROM API SUCCESS',
  GetBoardsFailure = '[Boards] GET BOARDS FROM API FAILURE',

  UpdateBoard = '[Boards] UPDATE BOARD FROM API',
  UpdateBoardSuccess = '[Boards] UPDATE BOARD FROM API SUCCESS',
  UpdateBoardFailure = '[Boards] UPDATE BOARD FROM API FAILURE',

  CreateBoard = '[Boards] CREATE BOARD FROM API',
  CreateBoardSuccess = '[Boards] CREATE BOARD FROM API SUCCESS',
  CreateBoardFailure = '[Boards] CREATE BOARD FROM API FAILURE',

  DeleteBoard = '[Boards] DELETE BOARD FROM API',
  DeleteBoardSuccess = '[Boards] DELETE BOARD FROM API SUCCESS',
  DeleteBoardFailure = '[Boards] DELETE BOARD FROM API FAILURE',
}
export class GetBoards implements Action {
  readonly type = BoardsTypes.GetBoards;
  constructor() { }
}
export class GetBoardsSuccess implements Action {
  readonly type = BoardsTypes.GetBoardsSuccess;
  constructor(public payload: IBoard[]) { }
}
export class GetBoardsFailure implements Action {
  readonly type = BoardsTypes.GetBoardsFailure;
  constructor() { }
}

export class CreateBoard implements Action {
  readonly type = BoardsTypes.CreateBoard;
  constructor(public payload: { body: IBoardRequest }) { }
}
export class CreateBoardSuccess implements Action {
  readonly type = BoardsTypes.CreateBoardSuccess;
  constructor(public payload: IBoard) { }
}
export class CreateBoardFailure implements Action {
  readonly type = BoardsTypes.CreateBoardFailure;
  constructor() { }
}

export class UpdateBoard implements Action {
  readonly type = BoardsTypes.UpdateBoard;
  constructor(public payload: { body: IBoardRequest, id: string }) { }
}
export class UpdateBoardSuccess implements Action {
  readonly type = BoardsTypes.UpdateBoardSuccess;
  constructor(public payload: IBoard) { }
}
export class UpdateBoardFailure implements Action {
  readonly type = BoardsTypes.UpdateBoardFailure;
  constructor() { }
}

export class DeleteBoard implements Action {
  readonly type = BoardsTypes.DeleteBoard;
  constructor(public payload: { id: string }) { }
}
export class DeleteBoardSuccess implements Action {
  readonly type = BoardsTypes.DeleteBoardSuccess;
  constructor(public payload: string) { }
}
export class DeleteBoardFailure implements Action {
  readonly type = BoardsTypes.DeleteBoardFailure;
  constructor() { }
}

export type BoardsActions =
  GetBoards |
  GetBoardsSuccess |
  GetBoardsFailure |
  UpdateBoard |
  UpdateBoardSuccess |
  UpdateBoardFailure |
  DeleteBoard |
  DeleteBoardFailure |
  DeleteBoardSuccess |
  CreateBoard |
  CreateBoardSuccess |
  CreateBoardFailure;
