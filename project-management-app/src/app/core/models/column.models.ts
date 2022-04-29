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
  files: IFiles[],
}

export interface IFiles {
  filename: string,
  fileSize: number
}
