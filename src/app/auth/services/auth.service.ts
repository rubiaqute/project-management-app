import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from "rxjs";
import { IUser } from 'src/app/core/models/api.models';
import { ApiFacade } from 'src/app/store/facade';

@Injectable({ providedIn: 'root' })

export class AuthService {
  public token$ = new Subject<any>();
  constructor(private apiFacade: ApiFacade) { }

  initAuth() {
    if (localStorage.getItem('tokenRubiaqute')) {
      const userId = JSON.parse(localStorage.getItem('currentUserRubiaqute')!).id;
      this.apiFacade.setUser(userId)
      this.token$.next(localStorage.getItem('tokenRubiaqute'));
    }
  }

  setToken(token: string): void {
    localStorage.setItem('tokenRubiaqute', token)
    this.token$.next(token)
  }

  setUser(user: IUser): void {
    localStorage.setItem('currentUserRubiaqute', JSON.stringify(user))
    this.apiFacade.setUser(user.id)
  }

  clearInfo(): void {
    this.apiFacade.logOutUser()
    localStorage.removeItem('tokenRubiaqute');
    localStorage.removeItem('currentUserRubiaqute');
    this.token$.next(null)
  }
}
