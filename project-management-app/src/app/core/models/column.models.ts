export interface IColumn {
  id: string,
  title: string,
  order: number,
  tasks?: ITask[],
}

export interface ITask {
  id: string,
  title: string,
  order: number,
  done: boolean,
  description: string,
  userId: string,
  files: IFile[],
}

export interface IFile {
  filename: string,
  fileSize: number,
}
