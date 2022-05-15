import { IColumn, ITask, Status } from '../../core/models/api.models';
import { ActiveBoardActions, ActiveBordTypes } from '../actions/active-board.actions';
import * as apiState from '../state';

export function activeBoardReducer(
  state = apiState.initialActiveBoardState,
  action: ActiveBoardActions
): apiState.ActiveBoardState {
  switch (action.type) {
    case ActiveBordTypes.GetActiveBoard: {
      return { ...state, getActiveBoardStatus: Status.IN_PROGRESS, loadingStatus: true };
    }

    case ActiveBordTypes.GetActiveBoardSuccess: {
      return { ...state, activeBoard: action.payload, getActiveBoardStatus: Status.SUCCESS, loadingStatus: false };
    }

    case ActiveBordTypes.GetActiveBoardFailure: {
      return {
        ...state,
        getActiveBoardStatus: Status.FAILURE,
        loadingStatus: false,
      };
    }
    case ActiveBordTypes.CreateColumn: {
      return { ...state, getCreateColumnStatus: Status.IN_PROGRESS, loadingStatus: true };
    }

    case ActiveBordTypes.CreateColumnSuccess: {
      const newActiveBoardState = Object.assign({}, state.activeBoard);
      if (state.activeBoard?.columns && state.activeBoard?.columns.length) {
        newActiveBoardState!.columns = [...state.activeBoard?.columns, action.payload]
      } else newActiveBoardState!.columns = [action.payload]
      return { ...state, activeBoard: newActiveBoardState, getCreateColumnStatus: Status.SUCCESS, loadingStatus: false };
    }

    case ActiveBordTypes.CreateColumnFailure: {
      return {
        ...state,
        getCreateColumnStatus: Status.FAILURE,
        loadingStatus: false,
      };
    }

    case ActiveBordTypes.UpdateColumn: {
      return { ...state, getUpdateColumnStatus: Status.IN_PROGRESS, loadingStatus: true };
    }

    case ActiveBordTypes.UpdateColumnSuccess: {
      const newActiveBoardState = Object.assign({}, state.activeBoard);
      const newColumns = newActiveBoardState.columns?.map((el) => {
        if (el.id === action.payload.id) {
          const updatedColumn: IColumn = {
            id: el.id,
            tasks: el.tasks || [],
            order: action.payload.order,
            title: action.payload.title
          }
          return updatedColumn
        } else return el
      })
      newActiveBoardState.columns = Object.assign([], newColumns)
      return { ...state, activeBoard: newActiveBoardState, getUpdateColumnStatus: Status.SUCCESS, loadingStatus: false };
    }

    case ActiveBordTypes.UpdateColumnFailure: {
      return {
        ...state,
        getUpdateColumnStatus: Status.FAILURE,
        loadingStatus: false,
      };
    }

    case ActiveBordTypes.DeleteColumn: {
      return { ...state, getDeleteColumnStatus: Status.IN_PROGRESS, loadingStatus: true };
    }

    case ActiveBordTypes.DeleteColumnSuccess: {
      const newActiveBoardState = Object.assign({}, state.activeBoard);
      const updatedColumns = newActiveBoardState.columns?.filter((el) => el.id !== action.payload)
      newActiveBoardState.columns = Object.assign([], updatedColumns)
      return { ...state, activeBoard: newActiveBoardState, getDeleteColumnStatus: Status.SUCCESS, loadingStatus: false };
    }

    case ActiveBordTypes.DeleteColumnFailure: {
      return {
        ...state,
        getDeleteColumnStatus: Status.FAILURE,
        loadingStatus: false,
      };
    }

    case ActiveBordTypes.CreateTask: {
      return { ...state, getCreateTaskStatus: Status.IN_PROGRESS, loadingStatus: true };
    }

    case ActiveBordTypes.CreateTaskSuccess: {
      const newActiveBoardState = Object.assign({}, state.activeBoard);
      const newColumns = newActiveBoardState.columns?.map((el) => {
        if (el.id === action.payload.columnId) {
          const upDateTasks = Object.assign([], el.tasks)
          upDateTasks.push(action.payload.task)
          const updatedColumn: IColumn = {
            id: el.id,
            tasks: upDateTasks,
            order: el.order,
            title: el.title
          }
          return updatedColumn
        } else return el
      })
      newActiveBoardState.columns = Object.assign([], newColumns)
      return { ...state, activeBoard: newActiveBoardState, getCreateTaskStatus: Status.SUCCESS, loadingStatus: false };
    }

    case ActiveBordTypes.CreateTaskFailure: {
      return {
        ...state,
        getUpdateTaskStatus: Status.FAILURE,
        loadingStatus: false,
      };
    }
    case ActiveBordTypes.UpdateTask: {
      return { ...state, getUpdateTaskStatus: Status.IN_PROGRESS, loadingStatus: true };
    }

    case ActiveBordTypes.UpdateTaskSuccess: {
      const newActiveBoardState = Object.assign({}, state.activeBoard);
      const newColumns = newActiveBoardState.columns?.map((el) => {
        if (el.id === action.payload.columnId) {
          let upDateTasks: ITask[] = Object.assign([], el.tasks)
          upDateTasks = upDateTasks.map(task => task.id === action.payload.taskId ? action.payload.task : task)
          const updatedColumn: IColumn = {
            id: el.id,
            tasks: upDateTasks,
            order: el.order,
            title: el.title,
          }
          return updatedColumn
        } else return el
      })
      newActiveBoardState.columns = Object.assign([], newColumns)
      return { ...state, activeBoard: newActiveBoardState, getUpdateTaskStatus: Status.SUCCESS, loadingStatus: false };
    }

    case ActiveBordTypes.UpdateTaskFailure: {
      return {
        ...state,
        getUpdateTaskStatus: Status.FAILURE,
        loadingStatus: false,
      };
    }
    case ActiveBordTypes.DeleteTask: {
      return { ...state, getDeleteTaskStatus: Status.IN_PROGRESS, loadingStatus: true };
    }

    case ActiveBordTypes.DeleteTaskSuccess: {
      const newActiveBoardState = Object.assign({}, state.activeBoard);
      const newColumns = newActiveBoardState.columns?.map((el) => {
        if (el.id === action.payload.columnId) {
          let upDateTasks: ITask[] = Object.assign([], el.tasks?.filter(task => task.id !== action.payload.taskId))
          const updatedColumn: IColumn = {
            id: el.id,
            tasks: upDateTasks,
            order: el.order,
            title: el.title,
          }
          return updatedColumn
        } else return el
      })
      newActiveBoardState.columns = Object.assign([], newColumns)
      return { ...state, activeBoard: newActiveBoardState, getDeleteTaskStatus: Status.SUCCESS, loadingStatus: false };
    }

    case ActiveBordTypes.DeleteTaskFailure: {
      return {
        ...state,
        getDeleteTaskStatus: Status.FAILURE,
        loadingStatus: false,
      };
    }

    default: {
      return state;
    }
  }
}
