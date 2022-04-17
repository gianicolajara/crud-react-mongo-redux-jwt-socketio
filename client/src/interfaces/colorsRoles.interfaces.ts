export interface ITypeOfColors {
  [key: string]:
    | "primary"
    | "secondary"
    | "default"
    | "error"
    | "info"
    | "success"
    | "warning"
    | undefined;
}

export interface IButtonRolesProps {
  roles: string[];
}
