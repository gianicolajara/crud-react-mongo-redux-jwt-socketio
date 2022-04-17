import { AlertColor } from "@mui/material";
import { ITypesOfErrors } from "./alert.interfaces";

export interface ErrorsProps {
  msg: string | Array<ITypesOfErrors> | null;
  severety?: AlertColor | undefined;
}
