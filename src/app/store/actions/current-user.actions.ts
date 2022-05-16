/* eslint-disable ngrx/prefer-action-creator */
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { IUser } from '../../core/models/api.models';

export enum CurrentUserTypes {

  GetCurrentUser = '[Users] GET USER FROM API',
  GetCurrentUserSuccess = '[Users] GET USER FROM API SUCCESS',
  GetCurrentUserFailure = '[Users] GET USER FROM API FAILURE',

  GetUsers = '[Users] GET ALL USERS FROM API',
  GetUsersSuccess = '[Users] GET ALL USERS FROM API SUCCESS',
  GetUsersFailure = '[Users] GET ALL USERS FROM API FAILURE',

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
export class GetUsers implements Action {
  readonly type = CurrentUserTypes.GetUsers;
  constructor() { }
}
export class GetUsersSuccess implements Action {
  readonly type = CurrentUserTypes.GetUsersSuccess;
  constructor(public payload: IUser[]) { }
}
export class GetUsersFailure implements Action {
  readonly type = CurrentUserTypes.GetUsersFailure;
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
  GetUsers |
  GetUsersSuccess |
  GetUsersFailure |
  LogOutUser;
