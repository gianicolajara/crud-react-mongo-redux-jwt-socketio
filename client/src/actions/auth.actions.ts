import { AxiosResponse } from "axios";
import { CLocalStorage } from "../class/locals";
import {
  deleteLocalStorage,
  setLocalStorage,
} from "../helpers/localStorage.helper";
import { IErrorMsg } from "../interfaces/alert.interfaces";
import {
  IAuthLoginResponseApi,
  IUserRegisterResponseAPI,
} from "../interfaces/auth.interfaces";
import { thunkActionType } from "../interfaces/thunkAction.interfaces";
import { login, logout, setSocketId } from "../reducers/auth";
import { loginService, registerService } from "../services/auth.services";
import { removeAlertAction, setAlertAction } from "./alert.actions";
import {
  setFormAlertAction,
  setRemoveFormAlertAction,
} from "./formAlerts.actions";

export const logoutAction = (): thunkActionType => async (dispatch) => {
  deleteLocalStorage(CLocalStorage.LOCAL_STORAGE_NAME);

  dispatch(logout({}));
};

export const setDataAuthAction =
  (username: string, token: string): thunkActionType =>
  (dispatch) => {
    if (username && token) {
      dispatch(
        login({
          username,
          token,
        })
      );
    }
  };

export const setSocketAuthAction =
  (socketId: string): thunkActionType =>
  async (dispatch) => {
    dispatch(setSocketId({ socketId }));
  };

export const loginAction =
  (username: string, password: string): thunkActionType =>
  async (dispatch) => {
    try {
      const resAuthApi: AxiosResponse<IAuthLoginResponseApi, any> =
        await loginService(username, password);

      if (resAuthApi.status === 200 && resAuthApi.statusText === "OK") {
        const { userData, token } = resAuthApi.data;

        setLocalStorage(CLocalStorage.LOCAL_STORAGE_NAME, {
          username: userData.username,
          token,
        });

        dispatch(
          login({
            username: userData.username as string,
            token,
          })
        );

        dispatch(setRemoveFormAlertAction());
        dispatch(removeAlertAction());
      }
    } catch (error: any) {
      if (error.response?.data.typeError === "expressValidator") {
        dispatch(setFormAlertAction(error.response.data.errors));
      } else {
        dispatch(setAlertAction(error as IErrorMsg, "error"));
      }
    }
  };

export const registerAction =
  (
    username: string,
    password: string,
    email: string,
    roles: string[],
    handleClear: () => void
  ): thunkActionType =>
  async (dispatch) => {
    try {
      const resRegisterApi: AxiosResponse<IUserRegisterResponseAPI, any> =
        await registerService(username, password, email, roles);

      if (
        resRegisterApi.status === 201 &&
        resRegisterApi.statusText === "Created"
      ) {
        handleClear();
        dispatch(setAlertAction({ msg: "New User Created" }, "success"));
      }
    } catch (error: any) {
      if (error.response?.data.typeError === "expressValidator") {
        dispatch(setFormAlertAction(error.response.data.errors));
      } else {
        dispatch(setAlertAction(error as IErrorMsg, "error"));
      }
    }
  };
