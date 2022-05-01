import {Injectable} from "@angular/core";
import {
  IBoard, IFile,
  IBoardRequest,
  IColumn, IColumnRequest,
  IFileUpload,
  ISignIn, ISignInRequest,
  ISignUp, ISignUpRequest,
  ITask, ITaskRequest, ITaskRequestUpdate,
  IUser, IUserRequest, IUserError
} from "../models/api.models";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {catchError} from "rxjs";

@Injectable({providedIn: 'root'})

export class ApiServices {
  url = environment.urlApi;
  public token$ = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjZWY1MGZiZS01ZmQ5LTQwNmYtOWE2Yy04YTViMGM4ODhkNTYiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTEyMDc0MjF9.fAP56cGNedi0rCipajhGc8DxvB6bJjg928ljzRWkhZQ';
  headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.token$}`);
  boards: IBoard[] = [];
  columns: IColumn[] = [];
  files: IFile[] = [];

  constructor(private http: HttpClient) {
  }

  //Authorization
  signIn(signIn: ISignInRequest) {
    return this.http.post<ISignIn>(`${this.url}/signin`,
      signIn, {headers: this.headers});
  }

  signUp(signUp: ISignUpRequest) {
    return this.http.post<ISignUp>(`${this.url}/signup`,
      signUp, {headers: this.headers})
  }

  //Users
  getUsers() {
    return this.http.get<IUser[]>(`${this.url}/users`,
      {headers: this.headers});
  }

  getUserById(id: string) {
    return this.http.get<IUser>(`${this.url}/users/${id}`,
      {headers: this.headers})
  }

  updateUser(id: string | null, user: IUserRequest) {
    return this.http.put<IUser>(`${this.url}/users/${id}`,
      user, {headers: this.headers})
  }

  deleteUser(id: string) {
    return this.http.delete<IUser>(`${this.url}/users/${id}`,
      {headers: this.headers})
  }

  //Boards
  getBoards() {
    return this.http.get<IBoard[]>(`${this.url}/boards`,
      {headers: this.headers});
  }

  getBoardById(id: string) {
    return this.http.get<IBoard>(`${this.url}/boards/${id}`,
      {headers: this.headers});
  }

  createBoard(board: IBoardRequest) {
    return this.http.post<IBoard>(`${this.url}/boards`,
      board, {headers: this.headers})
  }

  updateBoard(board: IBoardRequest, id: string) {
    return this.http.put<IBoard>(`${this.url}/boards/${id}`,
      board, {headers: this.headers})
  }

  deleteBoard(id: string) {
    return this.http.delete<IBoard>(`${this.url}/boards/${id}`,
      {headers: this.headers})
  }

  //Columns
  getColumns(boardId: string) {
    return this.http.get<IColumn[]>(`${this.url}/boards/${boardId}/columns`,
      {headers: this.headers});
  }

  getColumnById(boardId: string, columnId: string) {
    return this.http.get<IColumn>(`${this.url}/boards/${boardId}/columns/${columnId}`,
      {headers: this.headers});
  }

  createColumn(column: IColumnRequest, boardId: string) {
    return this.http.post<IColumn>(`${this.url}/boards/${boardId}/columns`,
      column, {headers: this.headers})
  }

  updateColumn(boardId: string, columnId: string, column: IColumnRequest) {
    return this.http.put<IColumn>(`${this.url}/boards/${boardId}/columns/${columnId}`,
      column, {headers: this.headers})
  }

  deleteColumn(boardId: string, columnId: string) {
    return this.http.delete<IColumn>(`${this.url}/boards/${boardId}/columns/${columnId}`,
      {headers: this.headers})
  }

  //Tasks
  getTasks(boardId: string, columnId: string) {
    return this.http.get<ITask[]>(`${this.url}/boards/${boardId}/columns/${columnId}/tasks`,
      {headers: this.headers})
  }

  getTaskById(boardId: string, columnId: string, taskId: string) {
    return this.http.get<ITask>(`${this.url}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      {headers: this.headers})
  }

  createTask(boardId: string, columnId: string, task: ITaskRequest) {
    return this.http.post<ITask>(`${this.url}/boards/${boardId}/columns/${columnId}/tasks`,
      task, {headers: this.headers})
  }

  updateTask(boardId: string, columnId: string, taskId: string, task: ITaskRequestUpdate) {
    return this.http.put<ITask>(`${this.url}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      task, {headers: this.headers})
  }

  deleteTask(boardId: string, columnId: string, taskId: string) {
    return this.http.delete<ITask>(`${this.url}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      {headers: this.headers})
  }

  //Files
  uploadFile(file: IFileUpload) {
    return this.http.post<IFile>(`${this.url}/file`,
      file, {headers: this.headers})
  }

  downloadFile(taskId: string, fileName: string) {
    return this.http.get<IFile>(`${this.url}/file/${taskId}/${fileName}`,
      {headers: this.headers})
  }
}
