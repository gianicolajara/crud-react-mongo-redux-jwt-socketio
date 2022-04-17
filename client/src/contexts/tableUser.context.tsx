import { Context, createContext, FC, ReactNode, SetStateAction } from "react";
import useField from "../hooks/useField";
import { EventInput } from "../interfaces/inputs.interfaces";
import { IUseFieldReturn } from "../interfaces/useField.interfaces";

interface ITableUserContextProps {
  children: ReactNode;
}

interface ITableUserContextApp {
  useFieldFilter: IUseFieldReturn;
}

const initialUseField: IUseFieldReturn = {
  props: {
    value: "",
    onChange: (e: EventInput) => {},
    type: "",
    label: "",
    variant: "standard",
    error: false,
    helperText: "",
    name: "",
  },
  helpers: {
    setValue: (value: SetStateAction<string>): void => {},
  },
};

const initialTableUserContextApp: ITableUserContextApp = {
  useFieldFilter: initialUseField,
};

const TableUserContextApp: Context<ITableUserContextApp> = createContext(
  initialTableUserContextApp
);

const TableUserProviderApp: FC<ITableUserContextProps> = ({ children }) => {
  const useFieldFilter: IUseFieldReturn = useField(
    "filter",
    "Filter",
    "outlined"
  );

  const data = {
    useFieldFilter,
  };

  return (
    <TableUserContextApp.Provider value={data}>
      {children}
    </TableUserContextApp.Provider>
  );
};

export default TableUserContextApp;
export { TableUserProviderApp };
