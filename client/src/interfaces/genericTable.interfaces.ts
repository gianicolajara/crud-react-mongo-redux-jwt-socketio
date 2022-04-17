import { OutlinedInputProps } from "@mui/material";
import { IUseFieldProps, IUseFieldReturn } from "./useField.interfaces";

export interface IGenericTableProps {
  headers?: Array<string> | null;
  rows?: Array<any> | null;
  actions?: Array<IGenericTableActionsProps> | null;
  pages?: number | null;
  numberRows?: number | null;
  showTextField?: Boolean;
  textFieldFinterProps?: IUseFieldReturn;
}

export interface IGenericTableActionsProps {
  id: number;
  icon: any;
  clickFunction: (id: number) => void;
}

export interface IBodyTableProps {
  rows: Array<any>;
  actions?: Array<IGenericTableActionsProps> | null;
}

export interface IHeaderTableProps {
  headers: Array<string>;
}
