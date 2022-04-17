import { ChangeEventInput } from "./inputs.interfaces";

export interface ITextField {
  value: string;
  onChangeValue: ChangeEventInput;
  type: string;
  label: string;
  variant: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
