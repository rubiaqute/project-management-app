import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {IFile} from "../models/column.models";

@Injectable(
  {
    providedIn: 'root',
  }
)

export class FileServices {
  public token$ = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjZWY1MGZiZS01ZmQ5LTQwNmYtOWE2Yy04YTViMGM4ODhkNTYiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTEyMDc0MjF9.fAP56cGNedi0rCipajhGc8DxvB6bJjg928ljzRWkhZQ';
  files: IFile[] = [];
  headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.token$}`);

  constructor(private http: HttpClient) {
  }

  uploadFile(taskId: string, file: string) {
    return this.http.post<IFile>(`https://kanban-rest-api.herokuapp.com/${file}`,
      {
        taskId: taskId,
        file: file,
      },
      {headers: this.headers})
  }

  downloadFile(taskId: string, fileName: string) {
    return this.http.get<IFile>(`https://kanban-rest-api.herokuapp.com/file/${taskId}/${fileName}`,
      {headers: this.headers})
  }
}
