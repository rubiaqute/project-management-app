import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';


import * as currentUserSelectors from './selectors/current-user.selectors';
import * as activeBoardSelectors from './selectors/active-board.selectors';
import * as boardsSelectors from './selectors/boards.selectors';
import * as currentUserActions from './actions/current-user.actions';
import * as activeBoardActions from './actions/active-board.actions';
import * as boardsActions from './actions/boards.actions';

import { IBoardRequest, IColumn, IColumnRequest, ITaskRequest } from '../core/models/api.models';

@Injectable({ providedIn: 'root' })
export class ApiFacade {
  readonly boards$ = this.store.select(boardsSelectors.selectBoards);
  readonly boardsLoadingStatus$ = this.store.select(boardsSelectors.selectBoardsLoadingStatus)
  readonly activeUser$ = this.store.select(currentUserSelectors.selectCurrentUser);
  readonly activeBoard$ = this.store.select(activeBoardSelectors.selectActiveBoard);
  constructor(private store: Store) {
  }

  loadBoards(): void {
    this.store.dispatch(new boardsActions.GetBoards());
  }
  logOutUser(): void {
    this.store.dispatch(new currentUserActions.LogOutUser());
  }

  setUser(id: string): void {
    this.store.dispatch(new currentUserActions.GetCurrentUser({ id }));
  }

  createBoard(body: IBoardRequest): void {
    this.store.dispatch(new boardsActions.CreateBoard({ body }));
  }
  updateBoardById(body: IBoardRequest, id: string): void {
    this.store.dispatch(new boardsActions.UpdateBoard({ body, id }));
  }

  deleteBoardById(id: string): void {
    this.store.dispatch(new boardsActions.DeleteBoard({ id }));
  }

  getActiveBoard(id: string): void {
    this.store.dispatch(new activeBoardActions.GetActiveBoard(id));
  }

  createColumn(column: IColumnRequest, boardId: string): void {
    this.store.dispatch(new activeBoardActions.CreateColumn({ body: column, id: boardId }));
  }
  updateColumn(boardId: string, columnId: string, column: IColumnRequest): void {
    this.store.dispatch(new activeBoardActions.UpdateColumn({ boardId, columnId, column }));
  }
  deleteColumn(boardId: string, columnId: string): void {
    this.store.dispatch(new activeBoardActions.DeleteColumn({ boardId, columnId }));
  }
  createTask(boardId: string, columnId: string, task: ITaskRequest): void {
    this.store.dispatch(new activeBoardActions.CreateTask({ boardId, columnId, task }));
  }
  updateTask(boardId: string, columnId: string, taskId: string, task: ITaskRequest): void {
    this.store.dispatch(new activeBoardActions.UpdateTask({ boardId, columnId, taskId, task }));
  }
  deleteTask(boardId: string, columnId: string, taskId: string): void {
    this.store.dispatch(new activeBoardActions.DeleteTask({ boardId, columnId, taskId }));
  }
}
