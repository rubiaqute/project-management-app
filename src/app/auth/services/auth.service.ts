import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from "rxjs";
import { IUser } from 'src/app/core/models/api.models';
import { ApiFacade } from 'src/app/store/facade';

@Injectable({ providedIn: 'root' })

export class AuthService {
  public token$ = new Subject<any>();
  constructor(private apiFacade: ApiFacade, private router: Router) { }

  initAuth() {
    if (localStorage.getItem('tokenRubiaqute')) {
      const userId = JSON.parse(localStorage.getItem('currentUserRubiaqute')!).id;
      this.router.navigate(['main'])
      this.apiFacade.setUser(userId)
      this.token$.next(localStorage.getItem('tokenRubiaqute'));
    }
  }

  setToken(token: string): void {
    localStorage.setItem('tokenRubiaqute', token)
    this.token$.next(token)
  }

  setUser(user: IUser): void {
    this.apiFacade.setUser(user.id)
    localStorage.setItem('currentUserRubiaqute', JSON.stringify(user))

  }

  clearInfo(): void {
    this.apiFacade.logOutUser()
    localStorage.removeItem('tokenRubiaqute');
    localStorage.removeItem('currentUserRubiaqute');
    this.token$.next(null)
  }
}
