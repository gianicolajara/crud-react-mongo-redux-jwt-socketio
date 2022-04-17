import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { themeStateEnum } from "../enums/theme.enum";
import { setLocalStorage } from "../helpers/localStorage.helper";
import { IThemeState } from "../interfaces/theme.interfaces";

const initialThemeState: IThemeState = {
  theme: themeStateEnum.light,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    //THEME_CHANGE
    themeChange: (state: IThemeState) => {
      const themeSelected: themeStateEnum =
        state.theme === themeStateEnum.light
          ? themeStateEnum.dark
          : themeStateEnum.light;

      setLocalStorage("data-theme-inventory-app", { theme: themeSelected });

      return {
        theme: themeSelected,
      };
    },
    //THEME_CHANGE_SPECIFIC
    themeChangeSpecific: {
      reducer: (state: IThemeState, action: PayloadAction<IThemeState>) => {
        return {
          theme: action.payload.theme,
        };
      },
      prepare: (value: themeStateEnum) => {
        return {
          payload: {
            theme: value,
          },
        };
      },
    },
  },
});

export default themeSlice.reducer;
export const { themeChange, themeChangeSpecific } = themeSlice.actions;
