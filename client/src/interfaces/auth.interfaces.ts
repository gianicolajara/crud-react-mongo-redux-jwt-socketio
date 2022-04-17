import { IUser } from "./user.interfaces";

export interface IAuthState {
  userData: IAuthStateUserData;
  token: string | null;
  socketId: string | null;
}

export interface IAuthStateUserData {
  username: string | null;
}

export interface IAuthActionsLogin {
  type: String;
  payload: IAuthLoginProps;
}

export interface IAuthLoginProps {
  username: string;
  token: string;
}

export interface IAuthActionsSetSocketId {
  type: String;
  payload: IAuthSocketId;
}

export interface IAuthSocketId {
  socketId: string;
}

export interface IAuthActionsLogout {
  type: String;
}

export interface IAuthLoginResponseApi {
  message: string;
  status: number;
  token: string;
  userData: IAuthStateUserData;
}

export interface IUserRegisterResponseAPI {
  message: string;
  newUser: IUser;
}

export type TypeAuthActions = IAuthActionsLogin &
  IAuthActionsLogout &
  IAuthActionsSetSocketId;
