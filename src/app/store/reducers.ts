import { Action, createReducer, on } from '@ngrx/store';
import { Status } from '../core/models/api.models';
import { ApiActions, ApiTypes } from './actions';
import { IAppState, initialMainState } from './store';
import * as apiState from './state';
// export const boardsReducer = createReducer(
//   initialState,
//   on(getBoards, (state) => ({...state, isLoading: true})),
//   on(getBoardsSuccess, (state, result) => ({...state, boards: result.boards, isLoading: false})),
// );

export function appReducer(
  state = apiState.initialApiState,
  action: ApiActions
): apiState.ApiState {
  switch (action.type) {
    case ApiTypes.GetBoards: {
      return { ...state, getBoardsStatus: Status.IN_PROGRESS, loadingStatus: Status.LOADING };
    }

    case ApiTypes.GetBoardsSuccess: {
      return { ...state, boards: action.payload, getBoardsStatus: Status.SUCCESS, loadingStatus: Status.SUCCESS };
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
    case ApiTypes.GetCurrentUser: {
      return { ...state, getActiveUserStatus: Status.IN_PROGRESS, loadingStatus: Status.LOADING };
    }
    case ApiTypes.GetCurrentUserSuccess: {
      return { ...state, activeUser: action.payload, getActiveUserStatus: Status.SUCCESS, loadingStatus: Status.SUCCESS };
    }
    case ApiTypes.GetCurrentUserFailure: {
      return {
        ...state,
        getActiveUserStatus: Status.FAILURE,
        loadingStatus: Status.FAILURE,
        loadingError: action.payload
      };
    }
    case ApiTypes.LogOutUser: {
      return { ...state, activeUser: null, getActiveUserStatus: Status.INITIAL };
    }

    // case ApiTypes.UpdateBoardSuccess: {
    //   const newStateUpdate = apiState.ApiAdapter.removeOne(action.payload.id!, state);
    //   const newState = apiState.ApiAdapter.addOne(
    //     action.payload,
    //     newStateUpdate
    //   )
    //   return { ...newState, updateBoardStatus: Status.SUCCESS, loadingStatus: Status.SUCCESS };
    // }

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
