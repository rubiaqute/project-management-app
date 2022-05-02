import { IBoard, IUser } from "../core/models/api.models"

export const initialMainState: IAppState = {
  activeBoard: null,
  activeUser: null,
  boards: [],
  isAuthorized: false,
  users: [],
  isDarkTheme: false
}

export interface IAppState {
  activeBoard: IBoard | null,
  activeUser: IUser | null,
  boards: IBoard[];
  isAuthorized: boolean;
  users: IUser[];
  isDarkTheme: boolean
}

export interface MainState {
  mainState: IAppState;
}
