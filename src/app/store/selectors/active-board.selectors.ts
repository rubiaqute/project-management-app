import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IColumn, ITask } from 'src/app/core/models/api.models';

import { ActiveBoardState } from '../state';


export const activeBoardFeatureName = 'activeBoardState';

export const getActiveBoardState = createFeatureSelector<ActiveBoardState>(activeBoardFeatureName);

export const selectActiveBoard = createSelector(getActiveBoardState, state => state.activeBoard);
export const selectActiveBoardLoadingStatus = createSelector(getActiveBoardState, state => state.loadingStatus);

export const selectActiveBoardColumns = createSelector(getActiveBoardState, state => {
  let columns: IColumn[] = Object.assign([], state.activeBoard?.columns)
  columns.sort((a, b) => a.order - b.order)
  let columnsWithSortedTasks: IColumn[] = []
  columnsWithSortedTasks = columns.map((column) => {
    let tasks: ITask[] = Object.assign([], column.tasks)
    tasks.sort((a, b) => a.order - b.order)
    const newColumn: IColumn = {
      id: column.id,
      tasks: tasks,
      order: column.order,
      title: column.title,
    }
    return newColumn
  })
  return columnsWithSortedTasks
});


export const getActiveBoardStatus = createSelector(getActiveBoardState, state => state.getActiveBoardStatus);
