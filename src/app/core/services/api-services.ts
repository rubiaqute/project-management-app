import { Injectable } from "@angular/core";
import {
  IBoard, IFile,
  IBoardRequest,
  IColumn, IColumnRequest,
  IFileUpload,
  ISignIn, ISignInRequest,
  ISignUp, ISignUpRequest,
  ITask, ITaskRequest, ITaskRequestUpdate,
  IUser, IUserRequest
} from "../models/api.models";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { constants } from "../constants";

@Injectable({ providedIn: 'root' })

export class ApiServices {
  url = constants.urlApi;
  boards: IBoard[] = [];
  columns: IColumn[] = [];
  files: IFile[] = [];

  constructor(private http: HttpClient) { }

  //Authorization
  signIn(signIn: ISignInRequest) {
    return this.http.post<ISignIn>(`${this.url}/signin`,
      signIn)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  signUp(signUp: ISignUpRequest) {
    return this.http.post<ISignUp>(`${this.url}/signup`,
      signUp)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  //Users
  getUsers() {
    return this.http.get<IUser[]>(`${this.url}/users`)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  getUserById$(id: string) {
    return this.http.get<IUser>(`${this.url}/users/${id}`)
    // .pipe(
    //   catchError((err => {
    //     console.error(err);
    //     return throwError(err);
    //   }))
    // );
  }

  updateUser(id: string | null, user: IUserRequest) {
    return this.http.put<IUser>(`${this.url}/users/${id}`, user)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  deleteUser(id: string | null) {
    return this.http.delete<IUser>(`${this.url}/users/${id}`)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  //Boards
  // getBoards() {
  //   return this.http.get<IBoard[]>(`${this.url}/boards`)
  //     .pipe(
  //       catchError((err => {
  //         console.error(err);
  //         return throwError(err);
  //       }))
  //     );
  // }
  getBoards$(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`${this.url}/boards`);
  }

  getBoardById(id: string) {
    return this.http.get<IBoard>(`${this.url}/boards/${id}`)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  createBoard(board: IBoardRequest) {
    return this.http.post<IBoard>(`${this.url}/boards`, board)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  updateBoard(board: IBoardRequest, id: string) {
    return this.http.put<IBoard>(`${this.url}/boards/${id}`, board)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  deleteBoard(id: string) {
    return this.http.delete<IBoard>(`${this.url}/boards/${id}`)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  //Columns
  getColumns(boardId: string) {
    return this.http.get<IColumn[]>(`${this.url}/boards/${boardId}/columns`)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  getColumnById(boardId: string, columnId: string) {
    return this.http.get<IColumn>(`${this.url}/boards/${boardId}/columns/${columnId}`)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  createColumn(column: IColumnRequest, boardId: string) {
    return this.http.post<IColumn>(`${this.url}/boards/${boardId}/columns`, column)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  updateColumn(boardId: string, columnId: string, column: IColumnRequest) {
    return this.http.put<IColumn>(`${this.url}/boards/${boardId}/columns/${columnId}`, column)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  deleteColumn(boardId: string, columnId: string) {
    return this.http.delete<IColumn>(`${this.url}/boards/${boardId}/columns/${columnId}`)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  //Tasks
  getTasks(boardId: string, columnId: string) {
    return this.http.get<ITask[]>(`${this.url}/boards/${boardId}/columns/${columnId}/tasks`)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  getTaskById(boardId: string, columnId: string, taskId: string) {
    return this.http.get<ITask>(`${this.url}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  createTask(boardId: string, columnId: string, task: ITaskRequest) {
    return this.http.post<ITask>(`${this.url}/boards/${boardId}/columns/${columnId}/tasks`, task)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  updateTask(boardId: string, columnId: string, taskId: string, task: ITaskRequestUpdate) {
    return this.http.put<ITask>(`${this.url}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, task)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  deleteTask(boardId: string, columnId: string, taskId: string) {
    return this.http.delete<ITask>(`${this.url}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  //Files
  uploadFile(file: IFileUpload) {
    return this.http.post<IFile>(`${this.url}/file`, file)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }

  downloadFile(taskId: string, fileName: string) {
    return this.http.get<IFile>(`${this.url}/file/${taskId}/${fileName}`)
      .pipe(
        catchError((err => {
          console.error(err);
          return throwError(err);
        }))
      );
  }
}
