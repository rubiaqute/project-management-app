import { createFeatureSelector, createSelector } from '@ngrx/store';


import { ApiAdapter, ApiState, boardsAdapter } from './state';

const { selectAll, selectEntities } = ApiAdapter.getSelectors();

export const apiFeatureName = 'mainState';

export const getApiState = createFeatureSelector<ApiState>(apiFeatureName);

export const boardsState = createSelector(getApiState, state => state.boards);

export const getBoards = createSelector(boardsState, selectAll);

export const getBoardsStatus = createSelector(getApiState, state => state.getBoardsStatus);


export const updateBoardStatus = createSelector(getApiState, state => state.updateBoardStatus);