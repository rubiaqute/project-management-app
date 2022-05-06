import { Action, createReducer, on } from '@ngrx/store';
import { Status } from '../core/models/api.models';
import { ApiActions, ApiTypes } from './actions';
import { IAppState, initialMainState } from './store';
import * as apiState from './state';



export function appReducer(
    state = apiState.initialApiState,
    action: ApiActions
  ): apiState.ApiState {
    switch (action.type) {
      case ApiTypes.GetBoards: {
        return { ...state, getBoardsStatus: Status.IN_PROGRESS, loadingStatus: Status.LOADING };
      }
  
      case ApiTypes.GetBoardsSuccess: {
        const newState = apiState.ApiAdapter.addMany(action.payload, state.boards);
        return { ...state, boards: newState, getBoardsStatus: Status.SUCCESS, loadingStatus: Status.SUCCESS };
      }
  
      case ApiTypes.GetBoardsFailure: {
        return {
          ...state,
          getBoardsStatus: Status.FAILURE,
          loadingStatus: Status.FAILURE,
          loadingError: action.payload
        };
      }
      case ApiTypes.UpdateBoard: {
        return { ...state, updateBoardStatus: Status.IN_PROGRESS, loadingStatus: Status.LOADING };
      }
  
      case ApiTypes.UpdateBoardSuccess: {
        const newStateUpdate = apiState.ApiAdapter.removeOne(action.payload.id, state);
        const newState = apiState.ApiAdapter.addOne(
          action.payload,
          newStateUpdate
        )
        return { ...newState, updateBoardStatus: Status.SUCCESS, loadingStatus: Status.SUCCESS };
      }
  
      case ApiTypes.UpdateBoardFailure: {
        return {
          ...state,
          updateBoardStatus: Status.FAILURE,
          loadingStatus: Status.FAILURE,
          loadingError: action.payload
        };
      }
      default: {
        return state;
      }
    }
  }
//   on(AppActions.getBoards, (state, { boards }) => {
//     return { ...state, ...boards };
//   }),
//   on(AppActions.getUsers, (state, { users }) => {
//     return { ...state, ...users };
//   }),
//   on(AppActions.changeAuthorizedStatus, (state, { isAuthorized }) => {
//     return { ...state, isAuthorized };
//   }),
//   on(AppActions.toggleDarkTheme, (state, { isDarkTheme }) => {
//     return { ...state, isDarkTheme };
//   }),
//   on(AppActions.selectBoard, (state, { board }) => {
//     return { ...state, activeBoard: board };
//   }),
//   on(AppActions.activateUser, (state, { activeUser }) => {
//     return { ...state, activeUser };
//   }),
// );

// export function appReducer(state: IAppState, action: Action) {
//   return reducer(state, action);
// }
