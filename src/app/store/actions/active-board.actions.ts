/* eslint-disable ngrx/prefer-action-creator */
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { IBoard, IColumn, IColumnRequest, ITask, ITaskRequest } from '../../core/models/api.models';

export enum ActiveBordTypes {

  GetActiveBoard = '[ActiveBoard] GET ACTIVE BOARD FROM API',
  GetActiveBoardSuccess = '[ActiveBoard] GET ACTIVE BOARD FROM API SUCCESS',
  GetActiveBoardFailure = '[ActiveBoard] GET ACTIVE BOARD FROM API FAILURE',

  CreateColumn = '[ActiveBoard] CREATE COLUMN FROM API',
  CreateColumnSuccess = '[ActiveBoard] CREATE COLUMN FROM API SUCCESS',
  CreateColumnFailure = '[ActiveBoard] CREATE COLUMN FROM API FAILURE',

  UpdateColumn = '[ActiveBoard] UPDATE COLUMN FROM API',
  UpdateColumnSuccess = '[ActiveBoard] UPDATE COLUMN FROM API SUCCESS',
  UpdateColumnFailure = '[ActiveBoard] UPDATE COLUMN FROM API FAILURE',

  DeleteColumn = '[ActiveBoard] DELETE COLUMN FROM API',
  DeleteColumnSuccess = '[ActiveBoard] DELETE COLUMN FROM API SUCCESS',
  DeleteColumnFailure = '[ActiveBoard] DELETE COLUMN FROM API FAILURE',

  CreateTask = '[ActiveBoard] CREATE TASK FROM API',
  CreateTaskSuccess = '[ActiveBoard] CREATE TASK FROM API SUCCESS',
  CreateTaskFailure = '[ActiveBoard] CREATE TASK FROM API FAILURE',

  UpdateTask = '[ActiveBoard] UPDATE TASK FROM API',
  UpdateTaskSuccess = '[ActiveBoard] UPDATE TASK FROM API SUCCESS',
  UpdateTaskFailure = '[ActiveBoard] UPDATE TASK FROM API FAILURE',

  DeleteTask = '[ActiveBoard] DELETE TASK FROM API',
  DeleteTaskSuccess = '[ActiveBoard] DELETE TASK FROM API SUCCESS',
  DeleteTaskFailure = '[ActiveBoard] DELETE TASK FROM API FAILURE',
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
export class UpdateColumn implements Action {
  readonly type = ActiveBordTypes.UpdateColumn;
  constructor(public payload: { boardId: string, columnId: string, column: IColumnRequest }) { }
}
export class UpdateColumnSuccess implements Action {
  readonly type = ActiveBordTypes.UpdateColumnSuccess;
  constructor(public payload: IColumn) { }
}
export class UpdateColumnFailure implements Action {
  readonly type = ActiveBordTypes.UpdateColumnFailure;
  constructor(public payload: HttpErrorResponse) { }
}
export class DeleteColumn implements Action {
  readonly type = ActiveBordTypes.DeleteColumn;
  constructor(public payload: { boardId: string, columnId: string }) { }
}
export class DeleteColumnSuccess implements Action {
  readonly type = ActiveBordTypes.DeleteColumnSuccess;
  constructor(public payload: string) { }
}
export class DeleteColumnFailure implements Action {
  readonly type = ActiveBordTypes.DeleteColumnFailure;
  constructor(public payload: HttpErrorResponse) { }
}
export class CreateTask implements Action {
  readonly type = ActiveBordTypes.CreateTask;
  constructor(public payload: { boardId: string, columnId: string, task: ITaskRequest }) { }
}
export class CreateTaskSuccess implements Action {
  readonly type = ActiveBordTypes.CreateTaskSuccess;
  constructor(public payload: { columnId: string, task: ITask }) { }
}
export class CreateTaskFailure implements Action {
  readonly type = ActiveBordTypes.CreateTaskFailure;
  constructor(public payload: HttpErrorResponse) { }
}
export class UpdateTask implements Action {
  readonly type = ActiveBordTypes.UpdateTask;
  constructor(public payload: { boardId: string, columnId: string, taskId: string, task: ITaskRequest }) { }
}
export class UpdateTaskSuccess implements Action {
  readonly type = ActiveBordTypes.UpdateTaskSuccess;
  constructor(public payload: { columnId: string, taskId: string, task: ITask }) { }
}
export class UpdateTaskFailure implements Action {
  readonly type = ActiveBordTypes.UpdateTaskFailure;
  constructor(public payload: HttpErrorResponse) { }
}
export class DeleteTask implements Action {
  readonly type = ActiveBordTypes.DeleteTask;
  constructor(public payload: { boardId: string, columnId: string, taskId: string }) { }
}
export class DeleteTaskSuccess implements Action {
  readonly type = ActiveBordTypes.DeleteTaskSuccess;
  constructor(public payload: { columnId: string, taskId: string }) { }
}
export class DeleteTaskFailure implements Action {
  readonly type = ActiveBordTypes.DeleteTaskFailure;
  constructor(public payload: HttpErrorResponse) { }
}

export type ActiveBoardActions =
  GetActiveBoard |
  GetActiveBoardSuccess |
  GetActiveBoardFailure |
  CreateColumn |
  CreateColumnSuccess |
  CreateColumnFailure |
  UpdateColumn |
  UpdateColumnSuccess |
  UpdateColumnFailure |
  DeleteColumn |
  DeleteColumnSuccess |
  DeleteColumnFailure |
  CreateTask |
  CreateTaskSuccess |
  CreateTaskFailure |
  UpdateTask |
  UpdateTaskFailure |
  UpdateTaskSuccess |
  DeleteTask |
  DeleteTaskSuccess |
  DeleteTaskFailure;

