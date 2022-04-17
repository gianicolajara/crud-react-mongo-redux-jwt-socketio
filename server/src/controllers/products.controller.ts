import { RequestHandler } from "express";
import Products from "../models/Products";

export const getAllProducts: RequestHandler = async (req, res, next) => {
  try {
    const productFinded = await Products.find();

    if (productFinded) {
      res.status(200).json({
        success: true,
        status: 200,
        data: productFinded,
      });
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        message: "No products found",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const { name, price, description, image, category, quantity } = req.body;

    const newProduct = new Products({
      name,
      price,
      description,
      image,
      category,
      quantity,
    });

    const newProductRes = await newProduct.save();

    if (newProductRes) {
      res.json({
        message: "product created",
        status: 200,
        data: newProductRes,
      });
    } else {
      res.json({
        message: "product not created",
        status: 400,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    const productsFindedToUpdate = Products.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });

    if (productsFindedToUpdate) {
      res.json({
        message: "product updated",
        status: 200,
        data: productsFindedToUpdate,
      });
    }
  } catch (error) {
    next(error);
  }
};
