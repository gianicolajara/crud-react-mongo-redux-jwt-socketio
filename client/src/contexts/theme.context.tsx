import { Theme } from "@emotion/react";
import { createTheme, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { Context, createContext, FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import {
  changeThemeAction,
  changeThemeSpecificAction,
} from "../actions/theme.actions";
import { themeStateEnum } from "../enums/theme.enum";
import { getLocalStorage } from "../helpers/localStorage.helper";
import {
  IThemeContextApp,
  IThemeContextProps,
  IThemeState,
} from "../interfaces/theme.interfaces";
import { RootState } from "../store";

export const ThemeContextApp: Context<IThemeContextApp> = createContext({
  changeTheme: () => {},
});

const ThemeContextProviderApp: FC<IThemeContextProps> = ({ children }) => {
  const themeSelector = useSelector((state: RootState) => state.theme);
  const dispatch: Dispatch<any> = useDispatch();
  const prefersDarkMode: boolean = useMediaQuery(
    "(prefers-color-scheme: dark)"
  );
  const themePreferLocalStorage: IThemeState =
    getLocalStorage("data-theme-inventory-app") || null;

  useEffect(() => {
    if (themePreferLocalStorage) {
      dispatch(
        changeThemeSpecificAction(
          themePreferLocalStorage.theme === themeStateEnum.dark
            ? themeStateEnum.dark
            : themeStateEnum.light
        )
      );
    } else {
      dispatch(
        changeThemeSpecificAction(
          prefersDarkMode ? themeStateEnum.dark : themeStateEnum.light
        )
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersDarkMode]);

  const changeTheme = (): void => {
    dispatch(changeThemeAction());
  };

  const theme: Theme = createTheme({
    palette: {
      mode: themeSelector.theme,
      primary: {
        main: "#1fdf64",
      },
    },
  });

  const data: IThemeContextApp = {
    changeTheme,
  };

  return (
    <ThemeContextApp.Provider value={data}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContextApp.Provider>
  );
};

export default ThemeContextProviderApp;
