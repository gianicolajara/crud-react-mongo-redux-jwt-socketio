import { AxiosResponse } from "axios";
import { IErrorMsg } from "../interfaces/alert.interfaces";
import {
  ICategory,
  ICategoryFormInputs,
} from "../interfaces/categories/category.interfaces";
import { thunkActionType } from "../interfaces/thunkAction.interfaces";
import { desactivatedCategory, setAllCategories } from "../reducers/categories";
import { setCategoryItem } from "../reducers/formCategory";
import {
  desactivatedCategoryService,
  getAllCategoriesService,
  updateCategoryService,
} from "../services/category.services";
import { setAlertAction } from "./alert.actions";
import { setFormAlertAction } from "./formAlerts.actions";

interface IGetAllCategoriesAxios {
  categories: ICategory[];
  message: string;
  status: number;
}

export const getAllCategories = (): thunkActionType => async (dispatch) => {
  try {
    const allProductsRes: AxiosResponse<IGetAllCategoriesAxios> =
      await getAllCategoriesService();

    if (allProductsRes) {
      dispatch(setAllCategories(allProductsRes.data.categories));
    }
  } catch (error: any) {
    if (error.response?.data.typeError === "expressValidator") {
      dispatch(setFormAlertAction(error.response.data.errors));
    } else {
      dispatch(setAlertAction(error as IErrorMsg, "error"));
    }
  }
};

export const toggleActivateCategoryAction =
  (category: ICategory): thunkActionType =>
  async (dispatch) => {
    try {
      const toggleActivateRes: AxiosResponse =
        await desactivatedCategoryService(category);

      if (toggleActivateRes) {
        dispatch(desactivatedCategory(category));
        dispatch(
          setAlertAction(
            {
              msg: `${category.name} is ${
                category.activate ? "Activated" : "Desactivated"
              }`,
            },
            "warning"
          )
        );
      }
    } catch (error: any) {
      if (error.response?.data.typeError === "expressValidator") {
        dispatch(setFormAlertAction(error.response.data.errors));
      } else {
        dispatch(setAlertAction(error as IErrorMsg, "error"));
      }
    }
  };

export const getItemInformationToUpdate =
  (category: ICategoryFormInputs): thunkActionType =>
  async (dispatch) => {
    try {
      dispatch(setCategoryItem(category));
    } catch (error: any) {
      if (error.response?.data.typeError === "expressValidator") {
        dispatch(setFormAlertAction(error.response.data.errors));
      } else {
        dispatch(setAlertAction(error as IErrorMsg, "error"));
      }
    }
  };
