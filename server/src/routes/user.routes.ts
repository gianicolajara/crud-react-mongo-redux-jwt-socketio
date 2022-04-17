import { Router } from "express";
import {
  toggleActiveUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller";
import { handleExpressValidator } from "../middlewares/handleExpressValidator";
import { validatorsUpdateUser } from "../validators/user.validators";

const userRouter: Router = Router();

userRouter.get("/", getUsers);
userRouter.put(
  "/update/:id",
  [...validatorsUpdateUser, handleExpressValidator],
  updateUser
);
userRouter.put("/delete/:id", toggleActiveUser);

export default userRouter;
