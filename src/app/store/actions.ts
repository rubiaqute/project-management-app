import { createAction, props } from '@ngrx/store';
import { IBoard, IUser } from '../core/models/api.models';

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

