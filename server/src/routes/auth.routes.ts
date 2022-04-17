import { Request, Response, Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { handleExpressValidator } from "../middlewares/handleExpressValidator";
import {
  loginAuthValidatorsList,
  registerAuthValidatorsList,
} from "../validators/auth.validators";

const authRouter: Router = Router();

authRouter.post(
  "/login",
  [...loginAuthValidatorsList, handleExpressValidator],
  login
);
authRouter.post(
  "/register",
  [...registerAuthValidatorsList, handleExpressValidator],
  register
);

export default authRouter;
