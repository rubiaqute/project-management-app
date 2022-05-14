import { Status } from '../../core/models/api.models';
import { BoardsActions, BoardsTypes } from '../actions/boards.actions';
import * as apiState from '../state';

export function boardsReducer(
  state = apiState.initialBoardsState,
  action: BoardsActions
): apiState.BoardsState {
  switch (action.type) {
    case BoardsTypes.GetBoards: {
      return { ...state, getBoardsStatus: Status.IN_PROGRESS, loadingStatus: true };
    }

    case BoardsTypes.GetBoardsSuccess: {
      return { ...state, boards: action.payload, getBoardsStatus: Status.SUCCESS, loadingStatus: false };
    }

    case BoardsTypes.GetBoardsFailure: {
      return {
        ...state,
        getBoardsStatus: Status.FAILURE,
        loadingStatus: false,
      };
    }
    case BoardsTypes.UpdateBoard: {

      return { ...state, updateBoardStatus: Status.IN_PROGRESS, loadingStatus: true };
    }
    case BoardsTypes.UpdateBoardSuccess: {
      const newBoardsState = Object.assign([], state.boards.filter((el) => el.id !== action.payload.id))
      newBoardsState.push(action.payload)
      return { ...state, boards: newBoardsState, updateBoardStatus: Status.SUCCESS, loadingStatus: false };
    }

    case BoardsTypes.UpdateBoardFailure: {
      return {
        ...state,
        updateBoardStatus: Status.FAILURE,
        loadingStatus: false,
      };
    }
    case BoardsTypes.CreateBoard: {
      return { ...state, createBoardStatus: Status.IN_PROGRESS, loadingStatus: true };
    }
    case BoardsTypes.CreateBoardSuccess: {
      const newBoards = Object.assign([], state.boards)
      newBoards.push(action.payload)
      return { ...state, boards: newBoards, createBoardStatus: Status.SUCCESS, loadingStatus: false };
    }

    case BoardsTypes.CreateBoardFailure: {
      return {
        ...state,
        createBoardStatus: Status.FAILURE,
        loadingStatus: false,
      };
    }
    case BoardsTypes.DeleteBoard: {
      return { ...state, deleteBoardStatus: Status.IN_PROGRESS, loadingStatus: true };
    }
    case BoardsTypes.DeleteBoardSuccess: {
      const newBoardsState = state.boards.filter((el) => el.id !== action.payload)
      return { ...state, boards: newBoardsState, deleteBoardStatus: Status.SUCCESS, loadingStatus: false };
    }
    case BoardsTypes.DeleteBoardFailure: {
      return { ...state, deleteBoardStatus: Status.FAILURE, loadingStatus: false };
    }

    default: {
      return state;
    }
  }
}
