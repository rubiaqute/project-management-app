import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {IBoard} from "../models/board.models";

@Injectable(
  {
    providedIn: 'root',
  }
)

export class BoardServices {
  public token$ = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjZWY1MGZiZS01ZmQ5LTQwNmYtOWE2Yy04YTViMGM4ODhkNTYiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTEyMDc0MjF9.fAP56cGNedi0rCipajhGc8DxvB6bJjg928ljzRWkhZQ';
  boards: IBoard[] = [];
  headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.token$}`);

  constructor(private http: HttpClient) {
  }

  getBoards() {
    return this.http.get<IBoard[]>('https://kanban-rest-api.herokuapp.com/boards',
      {headers: this.headers});
  }

  getBoardById(id: string) {
    return this.http.get<IBoard>(`https://kanban-rest-api.herokuapp.com/boards/${id}`,
      {headers: this.headers});
  }

  createBoard(title: string) {
    return this.http.post<IBoard>('https://kanban-rest-api.herokuapp.com/boards',
      {
        "title": title,
      },
      {headers: this.headers})
  }

  updateBoard(id: string, title: string) {
    return this.http.put<IBoard>(`https://kanban-rest-api.herokuapp.com/boards/${id}`,
      {
        title: title,
      },
      {headers: this.headers})
  }
}
