import { IBoard, IUser } from "../core/models/api.models"

export const initialMainState: IAppState = {
  activeBoard: null,
  boards: [],
  isAuthorized: false,
  token: '',
  users: [],
  isDarkTheme: false
}

export interface IAppState {
  activeBoard: IBoard | null,
  boards: IBoard[];
  isAuthorized: boolean;
  token: string;
  users: IUser[];
  isDarkTheme: boolean
}

export interface MainState {
  mainState: IAppState;
}
