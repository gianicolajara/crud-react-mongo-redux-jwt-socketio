import { MenuItem } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  IFormErrorErrors,
  IFormErrorState,
} from "../interfaces/formError.interfaces";
import { IUseSelectProps } from "../interfaces/useSelect.interfaces";

const initialValueSelect: string = "";
const initialError: boolean = false;
const initialErrorMessage: string = "";

const useSelect = (
  label: string,
  name: string,
  options: string[]
): IUseSelectProps => {
  const [value, setValue] = useState(initialValueSelect);
  const [error, setError] = useState(initialError);
  const [errorMessage, setErrorMessage] = useState(initialErrorMessage);

  const selectorFormErrors = useSelector(
    (state: IFormErrorState): IFormErrorErrors => state.formErrors
  );

  useEffect(() => {
    if (
      selectorFormErrors.errors &&
      selectorFormErrors.errors[name.toLowerCase()]
    ) {
      setError(true);
      setErrorMessage(selectorFormErrors.errors[name.toLowerCase()].msg);
    } else {
      setError(initialError);
      setErrorMessage(initialErrorMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectorFormErrors]);

  const clear = (): void => {
    setValue(initialValueSelect);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    setError(initialError);
    setErrorMessage(initialErrorMessage);
  };

  const items = options.map((item: string) => (
    <MenuItem key={item} value={item}>
      {item}
    </MenuItem>
  ));

  items.unshift(
    <MenuItem key="empty" value="">
      Select an option
    </MenuItem>
  );

  return {
    inputLabel: {
      id: label,
      error,
    },
    select: {
      value,
      label,
      onChange: handleChange,
      labelId: label,
      error,
    },
    menuItems: {
      items,
    },
    actions: {
      clear,
    },
    helper: {
      setValue,
      helperText: errorMessage,
    },
  };
};

export default useSelect;
