import {createAction, props} from '@ngrx/store';
import {IBoard} from "../../core/models/api.models";

export const GET_BOARDS = '[Boards] Get Boards';
export const GET_BOARDS_SUCCESS = '[Boards] Get Boards Success';

export const getBoards = createAction(
  GET_BOARDS
);

export const getBoardsSuccess = createAction(
  GET_BOARDS_SUCCESS,
  props<{ boards: any }>(),
);

