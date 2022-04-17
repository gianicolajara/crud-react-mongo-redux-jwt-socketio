import { RequestHandler } from "express";
import User from "../models/Users";
import jwt from "jsonwebtoken";

// @route   POST api/v1/auth/login
// @desc    Login del usuario
// @access  Publico
export const login: RequestHandler = async (req, res, next) => {
  try {
    let { username, password } = req.body;
    const userFinded = await User.findOne(
      { username },
      { username: 1, id: 1, password: 1 }
    );
    // verificamos que el usuario exista
    if (userFinded) {
      const resPasswordEncrypt = await User.passwordEncrypt(
        password,
        userFinded.password
      );
      //verificamos que la contraseña sea correcta
      if (resPasswordEncrypt) {
        //creamos el token para enviar al backend
        const token: String = jwt.sign(
          {
            id: userFinded._id,
            username: userFinded.username,
            email: userFinded.email,
          },
          process.env.SECRET_KEY_JWT as jwt.Secret
        );

        return res.json({
          message: "Login success",
          status: 200,
          userData: {
            username: userFinded.username,
          },
          token,
        });
        //else verificamos que la contraseña sea correcta
      } else {
        return res.status(401).json({
          message: "Login failed",
          status: 401,
        });
      }
      //else verificamos que el usuario exista
    } else {
      return res.status(401).json({
        message: "Login failed",
        status: 401,
      });
    }
  } catch (error) {
    next(error);
  }
};

// @route   POST api/v1/auth/register
// @desc    Register del usuario
// @access  Administrador
export const register: RequestHandler = async (req, res, next) => {
  try {
    let { username, password, email, roles } = req.body;

    //creamos el nuevo usuario
    const newUser = new User({
      username,
      password: await User.passwordCrypt(password),
      email,
      roles,
    });

    //guardamos el nuevo usuario
    await newUser.save();

    return res.status(201).json({
      message: "Register success",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};
