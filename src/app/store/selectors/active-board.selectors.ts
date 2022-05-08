import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ActiveBoardState } from '../state';


export const activeBoardFeatureName = 'activeBoardState';

export const getActiveBoardState = createFeatureSelector<ActiveBoardState>(activeBoardFeatureName);

export const selectActiveBoard = createSelector(getActiveBoardState, state => state.activeBoard);

export const getActiveBoardStatus = createSelector(getActiveBoardState, state => state.getActiveBoardStatus);
