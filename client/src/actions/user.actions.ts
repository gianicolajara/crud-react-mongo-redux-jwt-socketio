import { AxiosResponse } from "axios";
import { CUsers } from "../class/users";
import { IErrorMsg } from "../interfaces/alert.interfaces";
import { thunkActionType } from "../interfaces/thunkAction.interfaces";
import {
  IUser,
  IUserGetAllResponseAPI,
  IUsersDeleteUserResponseApi,
  IUserToUpdate,
} from "../interfaces/user.interfaces";
import {
  getAllUsers,
  updateActivateUser,
  updateUser,
} from "../services/user.services";
import { removeAlertAction, setAlertAction } from "./alert.actions";
import {
  setFormAlertAction,
  setRemoveFormAlertAction,
} from "./formAlerts.actions";

export const getAllUsersActions = (): thunkActionType => async (dispatch) => {
  try {
    const resGetAllUserService: AxiosResponse<IUserGetAllResponseAPI, any> =
      await getAllUsers();

    if (resGetAllUserService) {
      dispatch({
        type: CUsers.USERS_GET_ALL,
        payload: resGetAllUserService.data.users,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserAction =
  (id: string, active: Boolean): thunkActionType =>
  async (dispatch) => {
    try {
      const resDeleteUserService: AxiosResponse<
        IUsersDeleteUserResponseApi,
        any
      > = await updateActivateUser(id, { active });

      if (
        resDeleteUserService.status === 200 &&
        resDeleteUserService.statusText === "OK"
      ) {
        dispatch(
          setAlertAction(
            {
              msg: `User ${resDeleteUserService.data.user.username} ${
                active ? "activated" : "desactivated"
              } Successfully`,
            },
            "warning"
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

export const updateUserAction =
  (
    id: string,
    dataUserToUpdate: IUserToUpdate,
    handleClear: () => void
  ): thunkActionType =>
  async (dispatch) => {
    try {
      const bodyToSend: IUserToUpdate = {
        username: dataUserToUpdate.username,
        email: dataUserToUpdate.email,
        roles: dataUserToUpdate.roles,
      };

      bodyToSend.password =
        dataUserToUpdate.password === "" ? null : dataUserToUpdate.password;

      const resUpdateUserService: AxiosResponse<IUser, any> = await updateUser(
        id,
        bodyToSend
      );

      if (
        resUpdateUserService.status === 200 &&
        resUpdateUserService.statusText === "OK"
      ) {
        handleClear();

        dispatch(
          setAlertAction(
            {
              msg: `User ${dataUserToUpdate.username} was updated`,
            },
            "success"
          )
        );
      }
    } catch (error: any) {
      const { typeError } = error.response?.data;

      dispatch(setRemoveFormAlertAction());
      dispatch(removeAlertAction());

      if (typeError === "expressValidator") {
        dispatch(setFormAlertAction(error.response.data.errors));
      } else {
        dispatch(setAlertAction(error as IErrorMsg, "error"));
      }
    }
  };
