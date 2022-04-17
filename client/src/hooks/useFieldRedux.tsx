import { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IFormErrorErrors,
  IFormErrorState,
} from "../interfaces/formError.interfaces";
import { IUseFieldReduxProps } from "../interfaces/useFieldReducer/useFieldReducer.interfaces";
import { RootState } from "../store";

const initialError: boolean = false;
const initialErrorMsg: string | null = null;

const useFieldRedux = (
  type: string,
  label: string,
  name: string,
  reduxAction: (payload: { form: { [key: string]: string | number } }) => void,
  reducer: string
): IUseFieldReduxProps => {
  const dispatch: Dispatch<any> = useDispatch();

  const select = useSelector((state: RootState) => state[reducer]);

  const selectorFormErrors = useSelector(
    (state: IFormErrorState): IFormErrorErrors => state.formErrors
  );

  const [error, setError] = useState<boolean>(initialError);
  const [errorMsg, setErrorMsg] = useState<string | null>(initialErrorMsg);

  useEffect(() => {
    if (
      selectorFormErrors.errors &&
      selectorFormErrors.errors[label.toLowerCase()]
    ) {
      setError(true);
      setErrorMsg(selectorFormErrors.errors[label.toLowerCase()].msg);
    } else {
      setError(initialError);
      setErrorMsg(initialErrorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectorFormErrors]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      reduxAction({
        form: {
          [name]: e.currentTarget.value,
        },
      })
    );
    if (error) setError(initialError);
    if (errorMsg) setErrorMsg(initialErrorMsg);
  };

  return {
    props: {
      type,
      label,
      name,
      value: select!.form[name],
      onChange,
      error,
      helperText: errorMsg,
    },
  };
};

export default useFieldRedux;
