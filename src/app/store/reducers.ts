import { Action, createReducer, on } from '@ngrx/store';
import * as AppActions from './actions';
import { IAppState, initialMainState } from './store';

export const reducer = createReducer(
  initialMainState,
  on(AppActions.getBoards, (state, { boards }) => {
    return { ...state, ...boards };
  }),
  on(AppActions.getUsers, (state, { users }) => {
    return { ...state, ...users };
  }),
  on(AppActions.changeAuthorizedStatus, (state, { isAuthorized }) => {
    return { ...state, isAuthorized };
  }),
  on(AppActions.toggleDarkTheme, (state, { isDarkTheme }) => {
    return { ...state, isDarkTheme };
  }),
  on(AppActions.selectBoard, (state, { board }) => {
    return { ...state, activeBoard: board };
  }),
  on(AppActions.activateUser, (state, { activeUser }) => {
    return { ...state, activeUser };
  }),
);

export function appReducer(state: IAppState, action: Action) {
  return reducer(state, action);
}
