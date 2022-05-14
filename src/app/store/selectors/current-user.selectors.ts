/* eslint-disable ngrx/prefix-selectors-with-select */
import { createFeatureSelector, createSelector } from '@ngrx/store';


import { CurrentUserState } from '../state';

export const currentUserFeatureName = 'currentUserState';

export const getCurentUserState = createFeatureSelector<CurrentUserState>(currentUserFeatureName);


export const selectCurrentUser = createSelector(getCurentUserState, state => state.activeUser);

export const selectLoadingStatus = createSelector(getCurentUserState, state => state.loadingStatus);


