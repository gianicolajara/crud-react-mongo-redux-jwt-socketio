import React from "react";
import { Alert } from "@mui/material";
import Proptypes from "prop-types";
import { ErrorsProps } from "../interfaces/errorsProps.interces";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { ITypesOfErrors } from "../interfaces/alert.interfaces";
import { removeAlertAction } from "../actions/alert.actions";

let timeOutId: NodeJS.Timeout | null = null;

const Errors = ({ msg, severety = "error" }: ErrorsProps) => {
  const dispatch: Dispatch<any> = useDispatch();

  if (!msg) return null;

  if (timeOutId) {
    clearTimeout(timeOutId);
  }

  timeOutId = setTimeout((): void => {
    timeOutId = null;
    dispatch(removeAlertAction());
  }, 10000);

  if (msg instanceof Array) {
    return (
      <div>
        {msg.map((value: ITypesOfErrors, index) => (
          <Alert key={index} severity={severety}>
            {value.msg || value.message}
          </Alert>
        ))}
      </div>
    );
  }
  return (
    <Alert variant="filled" severity={severety}>
      {msg}
    </Alert>
  );
};

Errors.propTypes = {
  msg: Proptypes.oneOfType([Proptypes.string, Proptypes.array]),
  severety: Proptypes.oneOf(["error", "warning", "info", "success"]),
};

export default Errors;
