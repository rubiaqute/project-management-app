/* eslint-disable ngrx/prefer-action-creator */
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { IBoard, IColumn, IColumnRequest } from '../../core/models/api.models';

export enum ActiveBordTypes {

  GetActiveBoard = '[ActiveBoard] GET ACTIVE BOARD FROM API',
  GetActiveBoardSuccess = '[ActiveBoard] GET ACTIVE BOARD FROM API SUCCESS',
  GetActiveBoardFailure = '[ActiveBoard] GET ACTIVE BOARD FROM API FAILURE',

  CreateColumn = '[ActiveBoard] CREATE COLUMN FROM API',
  CreateColumnSuccess = '[ActiveBoard] CREATE COLUMN FROM API SUCCESS',
  CreateColumnFailure = '[ActiveBoard] CREATE COLUMN FROM API FAILURE',
}

export class GetActiveBoard implements Action {
  readonly type = ActiveBordTypes.GetActiveBoard;
  constructor(public payload: string) { }
}
export class GetActiveBoardSuccess implements Action {
  readonly type = ActiveBordTypes.GetActiveBoardSuccess;
  constructor(public payload: IBoard) { }
}
export class GetActiveBoardFailure implements Action {
  readonly type = ActiveBordTypes.GetActiveBoardFailure;
  constructor(public payload: HttpErrorResponse) { }
}
export class CreateColumn implements Action {
  readonly type = ActiveBordTypes.CreateColumn;
  constructor(public payload: { body: IColumnRequest, id: string }) { }
}
export class CreateColumnSuccess implements Action {
  readonly type = ActiveBordTypes.CreateColumnSuccess;
  constructor(public payload: IColumn) { }
}
export class CreateColumnFailure implements Action {
  readonly type = ActiveBordTypes.CreateColumnFailure;
  constructor(public payload: HttpErrorResponse) { }
}


export type ActiveBoardActions =
  GetActiveBoard |
  GetActiveBoardSuccess |
  GetActiveBoardFailure |
  CreateColumn |
  CreateColumnSuccess |
  CreateColumnFailure;
