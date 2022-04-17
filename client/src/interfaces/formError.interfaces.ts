import { Key } from "react";
import { CFormError } from "../class/formError";

export interface IFormError {
  location: string;
  msg: string;
  param: string;
  value: string;
}

export interface IFormErrorInitialState {
  errors: Array<IFormError> | null;
}

export interface IFormErrorErrors {
  errors: { [key: string | number]: IFormError };
}

export interface IFormErrorState {
  formErrors: IFormErrorErrors;
}

export interface ISetFormError {
  type: typeof CFormError.SET_ERROR;
  payload: IFormErrorInitialState;
}

export interface ISetRemoveFormError {
  type: typeof CFormError.REMOVE_ERROR;
}

export type FormErrorActions = ISetFormError & ISetRemoveFormError;
