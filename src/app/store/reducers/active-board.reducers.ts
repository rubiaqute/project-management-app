import { IColumn, Status } from '../../core/models/api.models';
import { ActiveBoardActions, ActiveBordTypes } from '../actions/active-board.actions';
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
    case ActiveBordTypes.CreateColumn: {
      return { ...state, getCreateColumnStatus: Status.IN_PROGRESS, loadingStatus: Status.LOADING };
    }

    case ActiveBordTypes.CreateColumnSuccess: {
      const newActiveBoardState = Object.assign({}, state.activeBoard);
      if (state.activeBoard?.columns && state.activeBoard?.columns.length) {
        newActiveBoardState!.columns = [...state.activeBoard?.columns, action.payload]
      } else newActiveBoardState!.columns = [action.payload]
      console.log(newActiveBoardState?.columns, 'колонка')
      console.log(action.payload, 'добавлена')
      return { ...state, activeBoard: newActiveBoardState, getCreateColumnStatus: Status.SUCCESS, loadingStatus: Status.SUCCESS };
    }

    case ActiveBordTypes.CreateColumnFailure: {
      return {
        ...state,
        getCreateColumnStatus: Status.FAILURE,
        loadingStatus: Status.FAILURE,
        loadingError: action.payload
      };
    }




    default: {
      return state;
    }
  }
}
