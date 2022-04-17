import { RequestHandler } from "express";
import Category from "../models/Category";

export const getAllCategories: RequestHandler = async (req, res, next) => {
  try {
    const findedCategories = await Category.find({});

    if (findedCategories) {
      return res.json({
        message: "Categories Finded",
        status: 200,
        categories: findedCategories,
      });
    } else {
      return res.status(404).json({
        message: "Categories not found",
        status: 404,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const addCategory: RequestHandler = async (req, res, next) => {
  try {
    const newCategory = new Category({ ...req.body });

    const newCategoryAdded = await newCategory.save();

    if (newCategoryAdded) {
      res.status(201).json({
        message: "Category Created",
        status: 201,
        newCategory,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteCategory: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { activate } = req.body;

    const categoryUpdated = await Category.findByIdAndUpdate(id, {
      activate,
    });

    if (categoryUpdated) {
      res.json({
        message: "Category Desactivated",
        status: 200,
        categoryUpdated,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateCategory: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, activate } = req.body;

    const categoryUpdated = await Category.findByIdAndUpdate(id, {
      name,
      activate,
    });

    if (categoryUpdated) {
      res.json({
        message: "Category Updated",
        status: 200,
        categoryUpdated,
      });
    }
  } catch (error) {
    next(error);
  }
};
