import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from "rxjs";
import { IUser } from 'src/app/core/models/api.models';
import { activateUser, changeAuthorizedStatus } from 'src/app/store/actions';
import { MainState } from 'src/app/store/store';

@Injectable({ providedIn: 'root' })

export class AuthService {
  public token$ = new Subject<any>();
  constructor(private store: Store<MainState>) { }

  initAuth() {
    if (localStorage.getItem('tokenRubiaqute')) {
      this.store.dispatch(changeAuthorizedStatus({ isAuthorized: true }))
      this.store.dispatch(activateUser({ activeUser: JSON.parse(localStorage.getItem('currentUserRubiaqute')!) }))
      this.token$.next(localStorage.getItem('tokenRubiaqute'));
    }
  }

  setToken(token: string): void {
    localStorage.setItem('tokenRubiaqute', token)
    this.store.dispatch(changeAuthorizedStatus({ isAuthorized: true }))
    this.token$.next(token)
  }

  setUser(user: IUser): void {
    localStorage.setItem('currentUserRubiaqute', JSON.stringify(user))
    this.store.dispatch(activateUser({ activeUser: user }))
  }

  clearInfo(): void {
    this.store.dispatch(changeAuthorizedStatus({ isAuthorized: false }))
    this.store.dispatch(activateUser({ activeUser: null }))
    localStorage.removeItem('tokenRubiaqute');
    localStorage.removeItem('currentUserRubiaqute');
    this.token$.next(null)
  }
}
