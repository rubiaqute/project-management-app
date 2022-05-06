export interface ISignIn {
  token: string,
}

export interface ISignInRequest {
  login: string,
  password: string,
}

export interface ISignUpRequest extends ISignInRequest {
  name: string,
}

export interface ISignUp {
  id: string | null,
  name: string,
  login: string,
}

export interface IUser {
  id: string,
  name: string,
  login: string,
}

export interface IUserRequest {
  name: string,
  login: string,
  password: string,
}

export interface IUserError {
  statusCode: number,
  message: string,
}

export interface IBoard {
  id: string,
  title: string,
  columns?: IColumn[],
}

export interface IBoardRequest {
  title: string,
}

export interface IColumn {
  id: string,
  title: string,
  order: number,
  tasks?: ITask[],
}

export interface IColumnRequest {
  title: string,
  order: number,
}

export interface ITask {
  id: string,
  title: string,
  order: number,
  description: string,
  userId: string,
  boardId: string,
  columnId: string,
  files?: IFile[],
}

export interface ITaskRequest {
  title: string,
  order: number,
  description: string,
  userId: string,
}

export interface ITaskRequestUpdate extends ITaskRequest {
  boardId: string,
  columnId: string,
}

export interface IFile {
  fileName: string,
  fileSize?: number,
}

export interface IFileUpload {
  taskId: string,
  file: string,
}

export enum Status {
  INITIAL = 'Initial',
  LOADING = 'Loading',
  SUCCESS = 'Success',
  FAILURE = 'Failure',
  IN_PROGRESS = 'InProgress',
}

export enum AsyncActionStatus {
  Delete = 'Delete',
  DeleteError = 'DeleteError',
  DeleteSuccess = 'DeleteSuccess',
  Update = 'Update',
  UpdateError = 'UpdateError',
  UpdateSuccess = 'UpdateSuccess'
}