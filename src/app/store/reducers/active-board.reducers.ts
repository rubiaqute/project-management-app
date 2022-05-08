import { Status } from '../../core/models/api.models';
import { ActiveBoardActions, ActiveBordTypes } from '../actions/current-user.actions';
import * as apiState from '../state';

export function activeBoardReducer(
  state = apiState.initialActiveBoardState,
  action: ActiveBoardActions
): apiState.ActiveBoardState {
  switch (action.type) {
    case ActiveBordTypes.GetActiveBoard: {
      return { ...state, getActiveBoardStatus: Status.IN_PROGRESS, loadingStatus: Status.LOADING };
    }

    case ActiveBordTypes.GetActiveBoardSuccess: {
      return { ...state, activeBoard: action.payload, getActiveBoardStatus: Status.SUCCESS, loadingStatus: Status.SUCCESS };
    }

    case ActiveBordTypes.GetActiveBoardFailure: {
      return {
        ...state,
        getActiveBoardStatus: Status.FAILURE,
        loadingStatus: Status.FAILURE,
        loadingError: action.payload
      };
    }



    default: {
      return state;
    }
  }
}
