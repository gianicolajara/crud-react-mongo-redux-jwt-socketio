import { themeStateEnum } from "../enums/theme.enum";
import { thunkActionType } from "../interfaces/thunkAction.interfaces";
import { themeChange, themeChangeSpecific } from "../reducers/theme";

export const changeThemeAction = (): thunkActionType => (dispatch) => {
  dispatch(themeChange());
};

export const changeThemeSpecificAction =
  (specificTheme: themeStateEnum): thunkActionType =>
  (dispatch) => {
    dispatch(themeChangeSpecific(specificTheme));
  };
