import {
  ChangeEvent,
  Context,
  createContext,
  FC,
  FormEvent,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../actions/auth.actions";
import { setRemoveFormAlertAction } from "../actions/formAlerts.actions";
import { updateUserAction } from "../actions/user.actions";
import { typeOfForm } from "../enums/formUser.enum";
import { enumRoles } from "../enums/roles.enum";
import useField from "../hooks/useField";
import useSelect from "../hooks/useSelect";
import { IAlert, IAlertState } from "../interfaces/alert.interfaces";
import {
  IFormErrorErrors,
  IFormErrorState,
} from "../interfaces/formError.interfaces";
import {
  IFormUserContext,
  IFormUserContextApp,
} from "../interfaces/formUserContext.interfaces";
import { EventInput } from "../interfaces/inputs.interfaces";
import { IUseFieldReturn } from "../interfaces/useField.interfaces";
import { IUser } from "../interfaces/user.interfaces";
import { IUseSelectProps } from "../interfaces/useSelect.interfaces";

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

const initialUseSelect: IUseSelectProps = {
  inputLabel: {
    id: "",
    error: false,
  },
  select: {
    value: "",
    onChange: (e: ChangeEvent<HTMLSelectElement>) => {},
    label: "",
    labelId: "",
    error: false,
  },
  menuItems: {
    items: [],
  },
  actions: {
    clear: (): void => {},
  },
  helper: {
    setValue: (value: SetStateAction<string>): void => {},
    helperText: "",
  },
};

const initialIdUser: string | null = null;

const FormUserContext: Context<IFormUserContextApp> = createContext({
  handleUpdate: (row: any) => {},
  handleSubmit: (e: FormEvent<HTMLFormElement>) => {},
  useFieldUsername: initialUseField,
  useFieldPassword: initialUseField,
  useFieldEmail: initialUseField,
  useSelectRole: initialUseSelect,
  typeForm: "",
  handleClear: () => {},
});

const initialTypeForm: typeOfForm = typeOfForm.create;

const FormUserProvider: FC<IFormUserContext> = ({ children }) => {
  const dispatch = useDispatch();

  const [typeForm, setTypeForm] = useState<typeOfForm>(initialTypeForm);

  const [idUser, setIdUser] = useState<string | null>(initialIdUser);

  const formAlertSelector: IFormErrorErrors = useSelector(
    (state: IFormErrorState) => state.formErrors
  );

  const errorAlertSelector: IAlert = useSelector(
    (state: IAlertState) => state.alert
  );

  const useFieldUsername: IUseFieldReturn = useField(
    "text",
    "Username",
    "outlined"
  );

  const useFieldPassword: IUseFieldReturn = useField(
    "password",
    "Password",
    "outlined"
  );

  const useFieldEmail: IUseFieldReturn = useField("email", "Email", "outlined");

  const useSelectRole: IUseSelectProps = useSelect(
    "Rol",
    "roles",
    Object.values(enumRoles)
  );

  const clearErrors = useCallback((): void => {
    if (
      formAlertSelector.errors &&
      Object.keys(formAlertSelector.errors).length > 0
    ) {
      dispatch(setRemoveFormAlertAction());
    }
    if (errorAlertSelector.msg) {
      dispatch(setRemoveFormAlertAction());
    }
  }, [dispatch, errorAlertSelector, formAlertSelector]);

  const handleClear = useCallback((): void => {
    setTypeForm(typeOfForm.create);
    useFieldUsername.helpers.setValue("");
    useFieldPassword.helpers.setValue("");
    useFieldEmail.helpers.setValue("");
    useSelectRole.actions.clear();
    clearErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearErrors]);

  const handleUpdate = (row: IUser): void => {
    useFieldUsername.helpers.setValue(row.username);
    useFieldEmail.helpers.setValue(row.email);
    useSelectRole.helper.setValue(row.roles[0]);
    clearErrors();
    setTypeForm(typeOfForm.update);
    setIdUser(row.id);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeForm === typeOfForm.create) {
      dispatch(
        registerAction(
          useFieldUsername.props.value,
          useFieldPassword.props.value,
          useFieldEmail.props.value,
          [useSelectRole.select.value],
          handleClear
        )
      );
    } else {
      dispatch(
        updateUserAction(
          idUser as string,
          {
            username: useFieldUsername.props.value,
            email: useFieldEmail.props.value,
            password: useFieldPassword.props.value,
            roles: [useSelectRole.select.value],
          },
          handleClear
        )
      );
    }
  };

  const data: IFormUserContextApp = {
    handleUpdate,
    useFieldUsername,
    useFieldPassword,
    useFieldEmail,
    useSelectRole,
    handleSubmit,
    typeForm,
    handleClear,
  };

  return (
    <FormUserContext.Provider value={data}>{children}</FormUserContext.Provider>
  );
};

export default FormUserProvider;
export { FormUserContext };
