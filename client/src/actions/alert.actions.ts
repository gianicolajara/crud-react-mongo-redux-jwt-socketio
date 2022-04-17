import { AlertColor } from "@mui/material";
import { IErrorMsg } from "../interfaces/alert.interfaces";
import { thunkActionType } from "../interfaces/thunkAction.interfaces";
import { removeAlert, setAlert } from "../reducers/alert";

export const setAlertAction =
  (errorMsg: IErrorMsg, msgType: AlertColor | undefined): thunkActionType =>
  (dispatch) => {
    if (errorMsg.response) {
      let alert: string | Array<string> | null =
        errorMsg.response.data.errors ||
        errorMsg.response.data.message ||
        errorMsg;

      return dispatch(setAlert({ msg: alert, msgType }));
    } else {
      return dispatch(
        setAlert({ msg: errorMsg.msg || errorMsg.message, msgType })
      );
    }
  };

export const removeAlertAction = (): thunkActionType => (dispatch) => {
  dispatch(removeAlert({}));
};
