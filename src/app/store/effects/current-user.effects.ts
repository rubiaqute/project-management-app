import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IUser } from '../../core/models/api.models';
import { ApiServices } from '../../core/services/api-services';
import * as currentUserActions from '../actions/actions';

@Injectable()
export class GetCurrentUserEffects {
  getUserById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(currentUserActions.CurrentUserTypes.GetCurrentUser),
      switchMap((action: any) =>
        this.apiServices.getUserById$(action.payload.id).pipe(
          map((user: IUser) => new currentUserActions.GetCurrentUserSuccess(user)),
          catchError(err => of(new currentUserActions.GetCurrentUserFailure(err))),
        )
      )
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly apiServices: ApiServices,
  ) { }
}
