import { createFeatureSelector, createSelector } from '@ngrx/store';


import { ApiState } from './state';


// const { selectAll, selectEntities } = ApiAdapter.getSelectors();
export const selectBoardsState = (state: any) => {
  return state.boards;
}
export const apiFeatureName = 'mainState';

export const getApiState = createFeatureSelector<ApiState>(apiFeatureName);

export const selectBoards = createSelector(getApiState, state => state.boards);

export const selectCurrentUser = createSelector(getApiState, state => state.activeUser);

export const getBoardsStatus = createSelector(getApiState, state => state.getBoardsStatus);


export const updateBoardStatus = createSelector(getApiState, state => state.updateBoardStatus);
