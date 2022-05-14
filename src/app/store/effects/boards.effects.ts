import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

import { catchError, map, switchMap } from 'rxjs/operators';
import { IBoard } from '../../core/models/api.models';
import { ApiServices } from '../../core/services/api-services.service';
import * as boardsActions from '../actions/boards.actions';

@Injectable()
export class GetBoardsRouteEffects {
  getBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(boardsActions.BoardsTypes.GetBoards),
      switchMap(() =>
        this.apiServices.getBoards$().pipe(
          map((boards: IBoard[]) => new boardsActions.GetBoardsSuccess(boards)),
          catchError(err => of(new boardsActions.GetBoardsFailure())),
        )
      )
    );
  });

  updateBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(boardsActions.BoardsTypes.UpdateBoard),
      switchMap((action: any) =>
        this.apiServices.updateBoard(action.payload.body, action.payload.id).pipe(
          map((board: IBoard) => new boardsActions.UpdateBoardSuccess(board)),
          catchError(err => of(new boardsActions.UpdateBoardFailure())),
        )
      )
    );
  });

  createBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(boardsActions.BoardsTypes.CreateBoard),
      switchMap((action: any) =>
        this.apiServices.createBoard(action.payload.body).pipe(
          map((board: IBoard) => new boardsActions.CreateBoardSuccess(board)),
          catchError(err => of(new boardsActions.CreateBoardFailure())),
        )
      )
    );
  });
  deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(boardsActions.BoardsTypes.DeleteBoard),
      switchMap((action: any) =>
        this.apiServices.deleteBoard(action.payload.id).pipe(
          map(() => new boardsActions.DeleteBoardSuccess(action.payload.id)),
          catchError(err => of(new boardsActions.DeleteBoardFailure())),
        )
      )
    );
  });


  constructor(
    private readonly actions$: Actions,
    private readonly apiServices: ApiServices,
  ) { }
}
