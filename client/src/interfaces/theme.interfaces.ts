export interface IThemeState {
  theme: string;
}

export interface IThemeContextProps {
  children: React.ReactNode;
}

export interface IThemeChangeAction {
  type: string;
}

export interface IThemeChangeSpecificAction {
  type: string;
  payload: IThemeState;
}

export interface IThemeContextApp {
  changeTheme: () => void;
}

export type TypeThemeActions = IThemeChangeAction & IThemeChangeSpecificAction;
