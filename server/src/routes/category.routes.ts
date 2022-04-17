import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/category.controller";
import { handleExpressValidator } from "../middlewares/handleExpressValidator";
import { listValidatorsCategory } from "../validators/category.validators";
const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.post(
  "/create",
  [...listValidatorsCategory, handleExpressValidator],
  addCategory
);
categoryRouter.post("/activated/:id", deleteCategory);
categoryRouter.post("/update/:id", updateCategory);

export default categoryRouter;
