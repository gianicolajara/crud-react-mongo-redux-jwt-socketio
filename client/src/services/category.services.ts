import axios, { AxiosResponse } from "axios";
import {
  ICategory,
  ICategoryForm,
  ICategoryFormInputs,
} from "../interfaces/categories/category.interfaces";

const urlBase: string = "http://localhost:5001/api/v1/category";

export const getAllCategoriesService = async (): Promise<AxiosResponse> => {
  try {
    const res = await axios.get(urlBase, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export const createCategoryService = async (
  category: ICategoryFormInputs
): Promise<AxiosResponse> => {
  console.log("category para enviar");
  console.log(category);

  try {
    const res = await axios.post(`${urlBase}/create`, category, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const desactivatedCategoryService = async (
  category: ICategory
): Promise<AxiosResponse> => {
  try {
    const res = await axios.post(
      `${urlBase}/activated/${category.id}`,
      {
        activate: !category.activate,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  } catch (error) {
    throw error;
  }
};

export const updateCategoryService = async (
  category: ICategoryFormInputs
): Promise<AxiosResponse> => {
  try {
    const res = await axios.post(`${urlBase}/update/${category.id}`, category, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
