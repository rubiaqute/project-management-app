import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IUser } from '../../core/models/api.models';
import { ApiServices } from '../../core/services/api-services.service';
import * as currentUserActions from '../actions/current-user.actions';

@Injectable()
export class GetCurrentUserEffects {
  getUserById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(currentUserActions.CurrentUserTypes.GetCurrentUser),
      switchMap((action: any) =>
        this.apiServices.getUserById$(action.payload.id).pipe(
          map((user: IUser) => new currentUserActions.GetCurrentUserSuccess(user)),
          catchError(err => of(new currentUserActions.GetCurrentUserFailure())),
        )
      )
    );
  });
  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(currentUserActions.CurrentUserTypes.GetUsers),
      switchMap((action: any) =>
        this.apiServices.getUsers().pipe(
          map((users: IUser[]) => new currentUserActions.GetUsersSuccess(users)),
          catchError(err => of(new currentUserActions.GetUsersFailure())),
        )
      )
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly apiServices: ApiServices,
  ) { }
}
