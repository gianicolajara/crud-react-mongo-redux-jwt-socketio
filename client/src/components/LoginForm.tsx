import { Box } from "@mui/material";
import React, { Dispatch, FC, useCallback } from "react";
import useField from "../hooks/useField";
import { IUseFieldReturn } from "../interfaces/useField.interfaces";
import ButtonGeneric from "./ButtonGeneric";
import TextFieldGeneric from "./TextFieldGeneric";
import { useDispatch } from "react-redux";
import { loginAction } from "../actions/auth.actions";



const LoginForm: FC = () => {

  const dispatch: Dispatch<any> = useDispatch();

  const useFieldUsername: IUseFieldReturn = useField("text", "Username", "outlined");
  const useFieldPassword: IUseFieldReturn = useField("password", "Password", "outlined");

  const handleSubmit = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch(loginAction(useFieldUsername.props.value, useFieldPassword.props.value));
  }, [dispatch, useFieldUsername.props.value, useFieldPassword.props.value]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 3 }}
    >
      <TextFieldGeneric useFieldProp={useFieldUsername} />
      <TextFieldGeneric useFieldProp={useFieldPassword} />

      <ButtonGeneric type="submit" variant="contained" text="Login" />
    </Box>
  );
};

export default LoginForm;
