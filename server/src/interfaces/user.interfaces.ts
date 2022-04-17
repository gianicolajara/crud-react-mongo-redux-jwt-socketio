import { Model } from "mongoose";

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  roles: string[];
}

export interface IUserModel extends Model<IUser> {
  passwordCrypt: (password: string) => Promise<string>;
  passwordEncrypt: (password: string, hash: string) => Promise<boolean>;
}
