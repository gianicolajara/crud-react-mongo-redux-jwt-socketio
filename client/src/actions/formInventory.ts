import { IErrorMsg } from "../interfaces/alert.interfaces";
import { IProduct } from "../interfaces/inventory/inventory.interfaces";
import { thunkActionType } from "../interfaces/thunkAction.interfaces";
import { clearForm, submitForm, typingOnForm } from "../reducers/formInventory";
import { addProductService } from "../services/products.services";
import { setAlertAction } from "./alert.actions";
import { setFormAlertAction } from "./formAlerts.actions";

export const typingOnFormAction =
  (payload: { [key: string]: string | number }): thunkActionType =>
  (dispatch) => {
    dispatch(typingOnForm(payload));
  };

export const submitOnFormInventoryAction =
  (product: IProduct): thunkActionType =>
  async (dispatch) => {
    try {
      await addProductService(
        product.name,
        product.price,
        product.description,
        product.category,
        product.quantity
      );
      dispatch(submitForm({}));
    } catch (error: any) {
      if (error.response?.data.typeError === "expressValidator") {
        dispatch(setFormAlertAction(error.response.data.errors));
      } else {
        dispatch(setAlertAction(error as IErrorMsg, "error"));
      }
    }
  };

export const clearFormInventoryAction = (): thunkActionType => (dispatch) => {
  dispatch(clearForm({}));
};
