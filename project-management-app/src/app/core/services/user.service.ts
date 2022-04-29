import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {IUser} from "../models/user.models";

@Injectable(
  {
    providedIn: 'root',
  }
)

export class UserService {
  public token$ = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjZWY1MGZiZS01ZmQ5LTQwNmYtOWE2Yy04YTViMGM4ODhkNTYiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTEyMDc0MjF9.fAP56cGNedi0rCipajhGc8DxvB6bJjg928ljzRWkhZQ';
  users: IUser[] = [];
  headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.token$}`);

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get<IUser[]>('https://kanban-rest-api.herokuapp.com/users',
      {headers: this.headers});
  }

  getUserById(id: string) {
    return this.http.get<IUser>(`https://kanban-rest-api.herokuapp.com/users/${id}`,
      {headers: this.headers})
  }

  updateUser(id: string, name: string, login: string, password: string) {
    return this.http.put<IUser>(`https://kanban-rest-api.herokuapp.com/users/${id}`,
      {
        name: name,
        login: login,
        password: password,
      },
      {headers: this.headers})
  }

  deleteUser(id: string) {
    return this.http.delete<IUser>(`https://kanban-rest-api.herokuapp.com/users/${id}`,
    {headers: this.headers})
  }
}
