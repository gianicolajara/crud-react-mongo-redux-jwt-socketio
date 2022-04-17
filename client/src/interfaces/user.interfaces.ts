import { CUsers } from "../class/users";

export interface IUser {
  id: string;
  active: boolean;
  username: string;
  email: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  socketId: string;
  password?: string;
  roles: string[];
}

export interface IUsersState {
  users: IUser[] | null;
}

export interface IUsersGetAllAction {
  type: typeof CUsers.USERS_GET_ALL;
  payload: IUser[];
}

export interface IUsersDeleteUserResponseApi {
  message: string;
  status: number;
  user: IUser;
}

export interface IUserGetAllResponseAPI {
  message: string;
  status: number;
  users: IUser[];
}

export interface IUserToUpdate {
  id?: string;
  username: string;
  email: string;
  password?: string | null;
  roles: string[];
}

export type TypeUsersActions = IUsersGetAllAction;
