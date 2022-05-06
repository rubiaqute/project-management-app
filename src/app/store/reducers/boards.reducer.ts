import { createReducer, on } from '@ngrx/store';
import { getBoards, getBoardsSuccess } from "../actions/boards.actions";

// export const initialState = {
//   boards: [],
//   isLoading: false,
// };
// export const boardsReducer = createReducer(
//   initialState,
//   on(getBoards, (state) => ({...state, isLoading: true})),
//   on(getBoardsSuccess, (state, result) => ({...state, boards: result.boards, isLoading: false})),
// );

