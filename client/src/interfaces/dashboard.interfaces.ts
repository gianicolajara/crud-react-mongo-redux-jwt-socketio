export interface IMenuItems {
  id: number;
  label: string;
  icon: any;
  path?: string;
  collapse?: boolean;
  listCollapse?: IMenuItems[];
}
