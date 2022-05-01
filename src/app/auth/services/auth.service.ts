import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})

export class AuthService {
  public token$ = new Subject<any>();

  setInfo(token: string): void {
    localStorage.setItem('token', token)
    this.token$.next(token)
  }

  loadInfo() {
    const data = localStorage.getItem('token');
    this.token$.next(data);
    return !!data;
  }

  clearInfo(): void {
    localStorage.removeItem('token')
    this.token$.next(null)
  }
}
