import { createSelector } from '@ngrx/store';
import { IBoard } from "../../core/models/api.models";
import { IAppState } from "../store";

export interface FeatureState {
  boards: IBoard[];
}

export interface AppState {
  boards: FeatureState;
  mainState: IAppState;
}

export const selectBoardsState = (state: any) => {
  return state.boards;
}


export const selectBoards = createSelector(
  selectBoardsState,
  (state: FeatureState) => {
    return state.boards;
  }
);

