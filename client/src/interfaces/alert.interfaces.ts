import { AlertColor } from "@mui/material";

export interface ITypesOfErrors {
  msg?: string;
  message?: string;
}

interface IResponseErrorMsg {
  data: IDataErrorMsg;
}

interface IDataErrorMsg {
  errors: Array<any>;
  message: string;
}

export interface IErrorMsg {
  response?: IResponseErrorMsg;
  msg?: string;
  message?: string;
}

export interface IAlert {
  msg: string | string[] | null;
  msgType: string | null;
}

export interface IAlertState {
  alert: IAlert;
}

export interface ISetAlert {
  type: string;
  payload: {
    msg: string | Array<string>;
    msgType: AlertColor;
  };
}

export interface IRemoveAlert {
  type: string;
}

export type TypeAlertActions = ISetAlert & IRemoveAlert;
