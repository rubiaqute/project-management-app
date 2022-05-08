import { Status } from '../../core/models/api.models';
import { BoardsActions, BoardsTypes } from '../actions/boards.actions';
import * as apiState from '../state';

export function boardsReducer(
  state = apiState.initialBoardsState,
  action: BoardsActions
): apiState.BoardsState {
  switch (action.type) {
    case BoardsTypes.GetBoards: {
      return { ...state, getBoardsStatus: Status.IN_PROGRESS, loadingStatus: Status.LOADING };
    }

    case BoardsTypes.GetBoardsSuccess: {
      return { ...state, boards: action.payload, getBoardsStatus: Status.SUCCESS, loadingStatus: Status.SUCCESS };
    }

    case BoardsTypes.GetBoardsFailure: {
      return {
        ...state,
        getBoardsStatus: Status.FAILURE,
        loadingStatus: Status.FAILURE,
        loadingError: action.payload
      };
    }
    case BoardsTypes.UpdateBoard: {
      return { ...state, updateBoardStatus: Status.IN_PROGRESS, loadingStatus: Status.LOADING };
    }
    case BoardsTypes.UpdateBoardSuccess: {
      return { ...state, updateBoardStatus: Status.SUCCESS, loadingStatus: Status.SUCCESS };
    }

    case BoardsTypes.UpdateBoardFailure: {
      return {
        ...state,
        updateBoardStatus: Status.FAILURE,
        loadingStatus: Status.FAILURE,
        loadingError: action.payload
      };
    }
    case BoardsTypes.CreateBoard: {
      return { ...state, createBoardStatus: Status.IN_PROGRESS, loadingStatus: Status.LOADING };
    }
    case BoardsTypes.CreateBoardSuccess: {
      const newBoards = [...state.boards, action.payload]
      return { ...state, boards: newBoards, createBoardStatus: Status.SUCCESS, loadingStatus: Status.SUCCESS };
    }

    case BoardsTypes.CreateBoardFailure: {
      return {
        ...state,
        createBoardStatus: Status.FAILURE,
        loadingStatus: Status.FAILURE,
        loadingError: action.payload
      };
    }
    case BoardsTypes.DeleteBoard: {
      return { ...state, deleteBoardStatus: Status.IN_PROGRESS, loadingStatus: Status.LOADING };
    }
    case BoardsTypes.DeleteBoardSuccess: {
      const newBoardsState = state.boards.filter((el) => el.id !== action.payload)
      return { ...state, boards: newBoardsState, deleteBoardStatus: Status.SUCCESS, loadingStatus: Status.SUCCESS };
    }
    case BoardsTypes.DeleteBoardFailure: {
      return { ...state, deleteBoardStatus: Status.FAILURE, loadingStatus: Status.FAILURE, loadingError: action.payload };
    }

    default: {
      return state;
    }
  }
}
