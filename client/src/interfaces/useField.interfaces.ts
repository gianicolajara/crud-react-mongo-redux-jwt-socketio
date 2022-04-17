import { Dispatch, SetStateAction } from "react";
import { EventInput } from "./inputs.interfaces";

export interface IUseFieldReturn {
  props: IUseFieldProps;
  helpers: IUseFieldHelpers;
}

export interface IUseFieldProps {
  value: string;
  onChange: (e: EventInput) => void;
  type: string;
  label: string;
  variant: "outlined" | "standard" | "filled" | undefined;
  error: boolean;
  helperText: string;
  name: string;
}

export interface IUseFieldHelpers {
  setValue: Dispatch<SetStateAction<string>>;
}
