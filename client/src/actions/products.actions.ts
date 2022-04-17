import { AxiosResponse } from "axios";
import { IErrorMsg } from "../interfaces/alert.interfaces";
import { thunkActionType } from "../interfaces/thunkAction.interfaces";
import { getAllProducts } from "../reducers/products";
import { getAllProductsService } from "../services/products.services";
import { setAlertAction } from "./alert.actions";
import { setFormAlertAction } from "./formAlerts.actions";

export const getAllProductsActions =
  (): thunkActionType => async (dispatch) => {
    try {
      const res: AxiosResponse = await getAllProductsService();

      if (res.status === 200 && res.statusText === "OK") {
        dispatch(getAllProducts(res.data.data));
      }
    } catch (error: any) {
      if (error.response?.data.typeError === "expressValidator") {
        dispatch(setFormAlertAction(error.response.data.errors));
      } else {
        dispatch(setAlertAction(error as IErrorMsg, "error"));
      }
    }
  };
