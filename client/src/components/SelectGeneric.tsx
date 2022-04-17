import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  SelectProps,
} from "@mui/material";
import React, { FC } from "react";
import { ISelectGenericProps } from "../interfaces/select.interfaces";

const SelectGeneric: FC<ISelectGenericProps> = ({ selectProps }) => {
  return (
    <FormControl {...selectProps.inputLabel.error}>
      <InputLabel {...selectProps.inputLabel}>
        {selectProps.inputLabel.id}
      </InputLabel>
      <Select {...(selectProps.select as unknown as SelectProps<string>)}>
        {selectProps.menuItems.items.map((item: JSX.Element) => item)}
      </Select>
      <FormHelperText error={true}>
        {selectProps.helper.helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default React.memo(SelectGeneric, (prevProps, nextProps) => {
  return (
    prevProps.selectProps.select.value === nextProps.selectProps.select.value &&
    prevProps.selectProps.helper.helperText ===
      nextProps.selectProps.helper.helperText
  );
});
