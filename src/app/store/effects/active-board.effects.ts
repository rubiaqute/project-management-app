import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IBoard, IColumn, ITask } from '../../core/models/api.models';
import { ApiServices } from '../../core/services/api-services';
import * as activeBoardActions from '../actions/active-board.actions';

@Injectable()
export class GetActiveBoardEffects {
  getActiveBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(activeBoardActions.ActiveBordTypes.GetActiveBoard),
      switchMap((action: any) =>
        this.apiServices.getBoardById(action.payload).pipe(
          map((board: IBoard) => new activeBoardActions.GetActiveBoardSuccess(board)),
          catchError(err => of(new activeBoardActions.GetActiveBoardFailure(err))),
        )
      )
    );
  });

  createColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(activeBoardActions.ActiveBordTypes.CreateColumn),
      switchMap((action: any) =>
        this.apiServices.createColumn(action.payload.body, action.payload.id).pipe(
          map((column: IColumn) => new activeBoardActions.CreateColumnSuccess(column)),
          catchError(err => of(new activeBoardActions.CreateColumnFailure(err))),
        )
      )
    );
  });

  updateColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(activeBoardActions.ActiveBordTypes.UpdateColumn),
      switchMap((action: any) =>
        this.apiServices.updateColumn(action.payload.boardId, action.payload.columnId, action.payload.column).pipe(
          map((column: IColumn) => new activeBoardActions.UpdateColumnSuccess(column)),
          catchError(err => of(new activeBoardActions.UpdateColumnFailure(err))),
        )
      )
    );
  });

  deleteColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(activeBoardActions.ActiveBordTypes.DeleteColumn),
      switchMap((action: any) =>
        this.apiServices.deleteColumn(action.payload.boardId, action.payload.columnId).pipe(
          map(() => new activeBoardActions.DeleteColumnSuccess(action.payload.columnId)),
          catchError(err => of(new activeBoardActions.DeleteColumnFailure(err))),
        )
      )
    );
  });
  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(activeBoardActions.ActiveBordTypes.CreateTask),
      switchMap((action: any) =>
        this.apiServices.createTask(action.payload.boardId, action.payload.columnId, action.payload.task).pipe(
          map((task: ITask) => new activeBoardActions.CreateTaskSuccess({ columnId: action.payload.columnId, task })),
          catchError(err => of(new activeBoardActions.CreateTaskFailure(err))),
        )
      )
    );
  });
  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(activeBoardActions.ActiveBordTypes.UpdateTask),
      switchMap((action: any) =>
        this.apiServices.updateTask(action.payload.boardId, action.payload.columnId, action.payload.taskId, action.payload.task).pipe(
          map((task: ITask) => new activeBoardActions.UpdateTaskSuccess({ columnId: action.payload.columnId, taskId: action.payload.taskId, task })),
          catchError(err => of(new activeBoardActions.UpdateTaskFailure(err))),
        )
      )
    );
  });
  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(activeBoardActions.ActiveBordTypes.DeleteTask),
      switchMap((action: any) =>
        this.apiServices.deleteTask(action.payload.boardId, action.payload.columnId, action.payload.taskId).pipe(
          map(() => new activeBoardActions.DeleteTaskSuccess({ columnId: action.payload.columnId, taskId: action.payload.taskId })),
          catchError(err => of(new activeBoardActions.DeleteTaskFailure(err))),
        )
      )
    );
  });
  constructor(
    private readonly actions$: Actions,
    private readonly apiServices: ApiServices,
  ) { }
}
