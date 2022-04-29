import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {IColumn} from "../models/column.models";
import {ITask} from "../models/task.models";

@Injectable(
  {
    providedIn: 'root',
  }
)

export class ColumnServices {
  public token$ = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjZWY1MGZiZS01ZmQ5LTQwNmYtOWE2Yy04YTViMGM4ODhkNTYiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTEyMDc0MjF9.fAP56cGNedi0rCipajhGc8DxvB6bJjg928ljzRWkhZQ';
  columns: IColumn[] = [];
  headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.token$}`);

  constructor(private http: HttpClient) {
  }

  getColumns(BoardId: string) {
    return this.http.get<IColumn>(`https://kanban-rest-api.herokuapp.com/boards/${BoardId}/columns`,
      {headers: this.headers});
  }

  createColumn(BoardId: string, title: string, order: number) {
    return this.http.post<IColumn>(`https://kanban-rest-api.herokuapp.com/boards/${BoardId}/columns`,
      {
        title: title,
        order: order,
      },
    {headers: this.headers}
  )}

  getColumnById(BoardId: string, ColumnId: string) {
    return this.http.get<IColumn>(`https://kanban-rest-api.herokuapp.com/boards/${BoardId}/columns/${ColumnId}`,
    {headers: this.headers}
    )}

  updateColumn(BoardId: string, ColumnId: string, title: string, order: number) {
    return this.http.put<IColumn>(`https://kanban-rest-api.herokuapp.com/boards/${BoardId}/columns/${ColumnId}`,
      {
        title: title,
        order: order
      },
      {headers: this.headers}
    )}

  deleteColumn(BoardId: string, ColumnId: string) {
    return this.http.delete<IColumn>(`https://kanban-rest-api.herokuapp.com/boards/${BoardId}/columns/${ColumnId}`,
      {headers: this.headers}
    )}
}
