import { IErrorMsg } from "../interfaces/alert.interfaces";
import {
  ICategory,
  ICategoryFormInputs,
} from "../interfaces/categories/category.interfaces";
import { thunkActionType } from "../interfaces/thunkAction.interfaces";
import { setAlertAction } from "./alert.actions";
import { setFormAlertAction } from "./formAlerts.actions";
import {
  createCategoryService,
  updateCategoryService,
} from "../services/category.services";
import { resetCategoryForm } from "../reducers/formCategory";
import { addCategory } from "../reducers/categories";
import { AxiosResponse } from "axios";

interface CreateCategoryResAxios {
  message: string;
  status: number;
  newCategory: ICategory;
}

export const submitCategoryFormAction =
  (category: ICategoryFormInputs): thunkActionType =>
  async (dispatch) => {
    try {
      let res = null;

      if (category.id) {
        res = await updateCategoryService(category);
      } else {
        res = (await createCategoryService(
          category
        )) as AxiosResponse<CreateCategoryResAxios>;
        dispatch(addCategory(res.data.newCategory));
      }

      if (res) {
        dispatch(resetCategoryForm({}));

        dispatch(setAlertAction({ msg: "New Category Created" }, "success"));
      }
    } catch (error: any) {
      if (error.response?.data.typeError === "expressValidator") {
        dispatch(setFormAlertAction(error.response.data.errors));
      } else {
        dispatch(setAlertAction(error as IErrorMsg, "error"));
      }
    }
  };

export const submitHandleCategory =
  (category: ICategory): thunkActionType =>
  async (dispatch) => {
    try {
      const res = await updateCategoryService(category);

      if (res) {
      }
    } catch (error: any) {
      if (error.response?.data.typeError === "expressValidator") {
        dispatch(setFormAlertAction(error.response.data.errors));
      } else {
        dispatch(setAlertAction(error as IErrorMsg, "error"));
      }
    }
  };
