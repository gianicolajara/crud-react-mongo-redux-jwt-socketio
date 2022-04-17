import { IMenuItems } from "./dashboard.interfaces";

export interface ISimpleDrawerProps {
  drawerWidth: number;
  menuItems: Array<IMenuItems>;
  children: React.ReactNode;
}
