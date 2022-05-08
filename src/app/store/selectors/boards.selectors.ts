import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BoardsState } from '../state';

export const boardsFeatureName = 'boardsState';

export const getBoardsState = createFeatureSelector<BoardsState>(boardsFeatureName);

export const selectBoards = createSelector(getBoardsState, state => state.boards);

export const getBoardsStatus = createSelector(getBoardsState, state => state.getBoardsStatus);

export const updateBoardStatus = createSelector(getBoardsState, state => state.updateBoardStatus);

export const deleteBoardStatus = createSelector(getBoardsState, state => state.deleteBoardStatus);

export const createBoardStatus = createSelector(getBoardsState, state => state.createBoardStatus);

