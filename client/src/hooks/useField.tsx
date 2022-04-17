import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ChangeEventInput, EventInput } from "../interfaces/inputs.interfaces";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  IFormErrorErrors,
  IFormErrorState,
} from "../interfaces/formError.interfaces";
import { IUseFieldReturn } from "../interfaces/useField.interfaces";

const initialValue: string = "";
const initialError: boolean = false;
const initialErrorMessage: string = "";

const useField = (
  type: string,
  label: string,
  variant: "outlined" | "standard" | "filled" | undefined = "standard"
): IUseFieldReturn => {
  const selectorFormErrors = useSelector(
    (state: IFormErrorState): IFormErrorErrors => state.formErrors
  );

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(initialError);
  const [errorMessage, setErrorMessage] = useState(initialErrorMessage);

  const onChangeValue: ChangeEventInput = useCallback((e: EventInput) => {
    setValue(e.target.value);
    setError(initialError);
    setErrorMessage(initialErrorMessage);
  }, []);

  useEffect(() => {
    if (
      selectorFormErrors.errors &&
      selectorFormErrors.errors[label.toLowerCase()]
    ) {
      setError(true);
      setErrorMessage(selectorFormErrors.errors[label.toLowerCase()].msg);
    } else {
      setError(initialError);
      setErrorMessage(initialErrorMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectorFormErrors]);

  return {
     props: {
        value,
        onChange: onChangeValue,
        type,
        label,
        variant,
        error,
        helperText: errorMessage,
        name: label.toLowerCase(),
      },
      helpers: {
        setValue,
      },
  }
};

useField.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["outlined", "filled", undefined]),
};

export default useField;
