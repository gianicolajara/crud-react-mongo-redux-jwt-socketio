import { TextField } from "@mui/material";
import React, { ChangeEvent, FC } from "react";

interface ITextFieldRedux {
  fullWidth?: boolean;
  label: string;
  name: string;
  value: string | number;
  type: string;
  error: boolean;
  helperText: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextFieldRedux: FC<ITextFieldRedux> = ({
  label,
  name,
  value,
  type,
  onChange,
  error,
  helperText,
}) => {
  return (
    <TextField
      type={type}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      error={error}
      helperText={helperText}
    />
  );
};

export default React.memo(TextFieldRedux, (prevProps, nextProps) => {
  return (
    prevProps.value === nextProps.value && prevProps.error === nextProps.error
  );
});
