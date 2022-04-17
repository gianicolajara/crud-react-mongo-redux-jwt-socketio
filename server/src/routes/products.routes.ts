import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/products.controller";

const productsRouter: Router = Router();

productsRouter.get("/", getAllProducts);

productsRouter.post("/create", createProduct);

export default productsRouter;
