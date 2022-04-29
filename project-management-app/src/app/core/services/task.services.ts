import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ITask } from "../models/column.models";

@Injectable(
  {
    providedIn: 'root',
  }
)

export class TaskServices {
  public token$ = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjZWY1MGZiZS01ZmQ5LTQwNmYtOWE2Yy04YTViMGM4ODhkNTYiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTEyMDc0MjF9.fAP56cGNedi0rCipajhGc8DxvB6bJjg928ljzRWkhZQ';
  tasks: ITask[] = [];
  headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.token$}`);

  constructor(private http: HttpClient) {
  }

  getTask(boardId: string, columnId: string) {
    return this.http.get<ITask>(`https://kanban-rest-api.herokuapp.com/boards/${boardId}/columns/${columnId}/tasks`,
      {headers: this.headers})
  }

  getTaskById(boardId: string, columnId: string, taskId: string) {
    return this.http.get<ITask>(`https://kanban-rest-api.herokuapp.com/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      {headers: this.headers})
  }

  createTask(boardId: string, columnId: string, title: string, order: number, description: string, userId: string) {
    return this.http.post<ITask>(`https://kanban-rest-api.herokuapp.com/boards/${boardId}/columns/${columnId}/tasks`,
      {
        title: title,
        order: order,
        description: description,
        userId: userId,
      },
      {headers: this.headers})
  }

  updateTask(boardId: string, columnId: string, taskId: string, title: string, order: number,
             description: string, userId: string) {
    return this.http.put<ITask>(`https://kanban-rest-api.herokuapp.com/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      {
        title: title,
        order: order,
        description: description,
        userId: userId,
        boardId: boardId,
        columnId: columnId,
      },
      {headers: this.headers})
  }

  deleteTask(boardId: string, columnId: string, taskId: string) {
    return this.http.delete<ITask>(`https://kanban-rest-api.herokuapp.com/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      {headers: this.headers})
  }
}
