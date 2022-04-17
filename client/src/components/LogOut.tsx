import { Button } from "@mui/material";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { logoutAction } from "../actions/auth.actions";

const LogOut: FC = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const logoutHandle = () => {
    dispatch(logoutAction());
  };

  return (
    <Button variant="contained" onClick={logoutHandle}>
      Logout
    </Button>
  );
};

export default LogOut;
