import { OutlinedTextFieldProps, TextField } from "@mui/material";
import React, { FC } from "react";
import { IUseFieldReturn } from "../interfaces/useField.interfaces";

interface ITextFieldGeneric {
  fullWidth?: boolean;
  useFieldProp: IUseFieldReturn;
}

const TextFieldGeneric: FC<ITextFieldGeneric> = ({
  fullWidth = true,
  useFieldProp,
}) => {
  return (
    <TextField
      {...(useFieldProp.props as OutlinedTextFieldProps)}
      fullWidth={fullWidth}
    />
  );
};

export default React.memo(TextFieldGeneric, (prevProps, nextProps) => {
  return (
    prevProps.useFieldProp.props.value === nextProps.useFieldProp.props.value &&
    prevProps.useFieldProp.props.error === nextProps.useFieldProp.props.error &&
    prevProps.useFieldProp.props.helperText ===
      nextProps.useFieldProp.props.helperText
  );
});
