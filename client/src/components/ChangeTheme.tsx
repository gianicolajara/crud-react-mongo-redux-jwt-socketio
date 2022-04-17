import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeContextApp } from "../contexts/theme.context";

const ChangeTheme = (): JSX.Element => {
  const { changeTheme } = useContext(ThemeContextApp);

  const themeSelector = useSelector((state: RootState) => state.theme);

  return themeSelector.theme === "dark" ? (
    <IconButton onClick={changeTheme}>
      <LightModeIcon />
    </IconButton>
  ) : (
    <IconButton onClick={changeTheme}>
      <DarkModeIcon />
    </IconButton>
  );
};

export default ChangeTheme;
