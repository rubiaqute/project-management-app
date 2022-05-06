import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, Observable, switchMap } from "rxjs";
import { ApiServices } from "../../core/services/api-services";
import { getBoards, getBoardsSuccess } from "../actions/boards.actions";

@Injectable()
export class BoardsEffects {

  constructor(
    private actions$: Actions,
    private apiService: ApiServices) {
  }

  // getBoards$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(getBoards),
  //     switchMap((value): Observable<any> => {
  //       return this.apiService.getBoards().pipe(
  //         map(boards => {
  //           return getBoardsSuccess({boards})
  //         })
  //       )
  //     })
  //   )
  // );
}
