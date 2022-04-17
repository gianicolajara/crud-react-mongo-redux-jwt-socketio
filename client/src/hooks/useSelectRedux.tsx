import { MenuItem } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import {
  IFormErrorErrors,
  IFormErrorState,
} from "../interfaces/formError.interfaces";
import { IUseSelectProps } from "../interfaces/useSelect.interfaces";
import { RootState } from "../store";

const initialValueSelect: string = "";
const initialError: boolean = false;
const initialErrorMsg: string | null = null;

const useSelectRedux = (
  type: string,
  label: string,
  name: string,
  reduxAction: (payload: { form: { [key: string]: string | number } }) => void,
  reducer: string,
  options: any[]
): IUseSelectProps => {
  const dispatch: Dispatch<any> = useDispatch();

  const select = useSelector((state: RootState) => state[reducer]);

  const [value, setValue] = useState<string>(initialValueSelect);
  const [error, setError] = useState<boolean>(initialError);
  const [errorMsg, setErrorMsg] = useState<string | null>(initialErrorMsg);

  const selectorFormErrors = useSelector(
    (state: IFormErrorState): IFormErrorErrors => state.formErrors
  );

  useEffect(() => {
    if (
      selectorFormErrors.errors &&
      selectorFormErrors.errors[name.toLowerCase()]
    ) {
      setError(true);
      setErrorMsg(selectorFormErrors.errors[name.toLowerCase()].msg);
    } else {
      setError(initialError);
      setErrorMsg(initialErrorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectorFormErrors]);

  const clear = (): void => {
    setValue(initialValueSelect);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      reduxAction({
        form: {
          [name]: e.target.value,
        },
      })
    );
    if (error) setError(initialError);
    if (errorMsg) setErrorMsg(initialErrorMsg);
  };

  const items = options.map((item: { id: string; name: string }) => (
    <MenuItem key={item.id} value={item.id}>
      {item.name}
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
      value: select!.form[name],
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
      helperText: errorMsg,
    },
  };
};

export default useSelectRedux;
