/* eslint-disable ngrx/prefer-action-creator */
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { IUser } from '../../core/models/api.models';

export enum CurrentUserTypes {

  GetCurrentUser = '[Users] GET USER FROM API',
  GetCurrentUserSuccess = '[Users] GET USER FROM API SUCCESS',
  GetCurrentUserFailure = '[Users] GET USER FROM API FAILURE',

  LogOutUser = '[Users] LOGOUT USER',
}

export class GetCurrentUser implements Action {
  readonly type = CurrentUserTypes.GetCurrentUser;
  constructor(public payload: { id: string }) { }
}
export class GetCurrentUserSuccess implements Action {
  readonly type = CurrentUserTypes.GetCurrentUserSuccess;
  constructor(public payload: IUser) { }
}
export class GetCurrentUserFailure implements Action {
  readonly type = CurrentUserTypes.GetCurrentUserFailure;
  constructor() { }
}
export class LogOutUser implements Action {
  readonly type = CurrentUserTypes.LogOutUser;
  constructor() { }
}

export type CurrentUserActions =
  GetCurrentUser |
  GetCurrentUserSuccess |
  GetCurrentUserFailure |
  LogOutUser;
