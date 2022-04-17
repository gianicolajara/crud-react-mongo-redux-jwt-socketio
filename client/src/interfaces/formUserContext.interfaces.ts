import { FormEvent, ReactNode } from "react";
import { IUseFieldReturn } from "./useField.interfaces";
import { IUseSelectProps } from "./useSelect.interfaces";

export interface IFormUserContext {
  children: ReactNode;
}

export interface IFormUserContextApp {
  handleUpdate: (row: any) => void;
  useFieldUsername: IUseFieldReturn;
  useFieldPassword: IUseFieldReturn;
  useFieldEmail: IUseFieldReturn;
  useSelectRole: IUseSelectProps;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  typeForm: string;
  handleClear: () => void;
}
