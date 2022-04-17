import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface IUseSelectProps {
  inputLabel: {
    id: string;
    error: boolean;
  };
  select: {
    value: string;
    label: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    labelId: string;
    error: boolean;
  };
  menuItems: {
    items: JSX.Element[];
  };
  actions: {
    clear: () => void;
  };
  helper: {
    setValue: Dispatch<SetStateAction<string>>;
    helperText: string | null;
  };
}
