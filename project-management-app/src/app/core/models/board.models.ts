import {IColumn} from "./column.models";

export interface IBoard {
  id: string,
  title: string,
  columns?: IColumn[],
}
