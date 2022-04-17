import { RequestHandler } from "express";
import Users from "../models/Users";

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const usersFinded = await Users.find({});
    if (usersFinded) {
      res.status(200).json({
        message: "Users finded",
        status: 200,
        users: usersFinded,
      });
    } else {
      res.status(404).json({
        message: "Users not found",
        status: 404,
      });
    }
  } catch (error) {
    next(error);
  }
};

interface IUserToUpdate {
  id?: string;
  username: string;
  email: string;
  password?: string | null;
  roles: string[];
}

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password, roles } = req.body;

    const userToUpdate: IUserToUpdate = {
      username,
      email,
      roles,
    };

    if (password) {
      userToUpdate.password = await Users.passwordCrypt(password);
    }

    const userUpdate = await Users.findByIdAndUpdate(id, userToUpdate, {
      new: true,
    });

    if (userUpdate) {
      res.status(200).json({
        message: "User updated",
        status: 200,
        user: userUpdate,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const toggleActiveUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const userDeleted = await Users.findByIdAndUpdate(id, {
      active: active as Boolean,
    });

    if (userDeleted) {
      res.status(200).json({
        message: "User desactivated",
        status: 200,
        user: userDeleted,
      });
    } else {
      res.status(404).json({
        message: "User not found",
        status: 404,
      });
    }
  } catch (error) {
    next(error);
  }
};
