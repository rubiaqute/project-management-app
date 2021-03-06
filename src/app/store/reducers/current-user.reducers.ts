import { Status } from '../../core/models/api.models';
import { CurrentUserActions, CurrentUserTypes } from '../actions/current-user.actions';
import * as currentUserState from '../state';

export function currentUserReducer(
  state = currentUserState.initialCurrentUserState,
  action: CurrentUserActions
): currentUserState.CurrentUserState {
  switch (action.type) {

    case CurrentUserTypes.GetCurrentUser: {
      return { ...state, activeUserStatus: Status.IN_PROGRESS, loadingStatus: Status.LOADING };
    }
    case CurrentUserTypes.GetCurrentUserSuccess: {
      return { ...state, activeUser: action.payload, activeUserStatus: Status.SUCCESS, loadingStatus: Status.SUCCESS };
    }
    case CurrentUserTypes.GetCurrentUserFailure: {
      return {
        ...state,
        activeUserStatus: Status.FAILURE,
        loadingStatus: Status.FAILURE,
      };
    }
    case CurrentUserTypes.GetUsers: {
      return { ...state, loadingStatus: Status.LOADING };
    }
    case CurrentUserTypes.GetUsersSuccess: {
      return { ...state, users: action.payload, loadingStatus: Status.SUCCESS };
    }
    case CurrentUserTypes.GetUsersFailure: {
      return {
        ...state,
        loadingStatus: Status.FAILURE,
      };
    }
    case CurrentUserTypes.LogOutUser: {
      return { ...state, activeUser: null, activeUserStatus: Status.INITIAL };
    }


    default: {
      return state;
    }
  }
}
