import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IBoard, IColumn } from '../../core/models/api.models';
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

  constructor(
    private readonly actions$: Actions,
    private readonly apiServices: ApiServices,
  ) { }
}
