import { IFormErrorState } from "../interfaces/formError.interfaces";
import { thunkActionType } from "../interfaces/thunkAction.interfaces";
import { removeFormError, setFormError } from "../reducers/formError";

export const setFormAlertAction =
  (errors: IFormErrorState): thunkActionType =>
  (dispatch) => {
    dispatch(setFormError(errors));
  };

export const setRemoveFormAlertAction = (): thunkActionType => (dispatch) => {
  dispatch(removeFormError({}));
};
