import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { asyncScheduler, combineLatest, EMPTY, Observable, of } from 'rxjs';
import { catchError, debounceTime, filter, map, mergeMap, observeOn, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { IBoard, IUser } from '../core/models/api.models';
import { ApiServices } from '../core/services/api-services';
import * as apiActions from './actions';

@Injectable()
export class GetBoardsEffects {
  getBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiActions.ApiTypes.GetBoards),
      switchMap(() =>
        this.apiServices.getBoards$().pipe(
          map((boards: IBoard[]) => new apiActions.GetBoardsSuccess(boards)),
          catchError(err => of(new apiActions.GetBoardsFailure(err))),
        )
      )
    );
  });

  updateBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiActions.ApiTypes.UpdateBoard),
      switchMap((action: any) =>
        this.apiServices.updateBoard(action.payload.body, action.payload.id).pipe(
          map((board: IBoard) => new apiActions.UpdateBoardSuccess(board)),
          catchError(err => of(new apiActions.UpdateBoardFailure(err))),
        )
      )
    );
  });
  deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiActions.ApiTypes.DeleteBoard),
      switchMap((action: any) =>
        this.apiServices.deleteBoard(action.payload.id).pipe(
          map(() => new apiActions.DeleteBoardSuccess(action.payload.id)),
          catchError(err => of(new apiActions.DeleteBoardFailure(err))),
        )
      )
    );
  });
  getUserById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiActions.ApiTypes.GetCurrentUser),
      switchMap((action: any) =>
        this.apiServices.getUserById$(action.payload.id).pipe(
          map((user: IUser) => new apiActions.GetCurrentUserSuccess(user)),
          catchError(err => of(new apiActions.GetCurrentUserFailure(err))),
        )
      )
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly apiServices: ApiServices,
  ) { }
}
