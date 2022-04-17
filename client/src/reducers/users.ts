import { Reducer } from "redux";
import { CUsers } from "../class/users";
import { IUsersState, TypeUsersActions } from "../interfaces/user.interfaces";

const initialUsersState: IUsersState = {
  users: null,
};

export const usersReducer: Reducer<IUsersState, TypeUsersActions> = (
  state: IUsersState = initialUsersState,
  action: TypeUsersActions
) => {
  switch (action.type) {
    case CUsers.USERS_GET_ALL:
      return {
        users: action.payload,
      };
    default:
      return { ...state };
  }
};
