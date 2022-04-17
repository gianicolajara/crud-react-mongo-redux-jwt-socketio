import React, { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";
import HomeIcon from "@mui/icons-material/Home";
import SimpleDrawer from "../components/SimpleDrawer";
import PersonIcon from "@mui/icons-material/Person";
import { IMenuItems } from "../interfaces/dashboard.interfaces";
import CategoryIcon from "@mui/icons-material/Category";
import AllInboxIcon from "@mui/icons-material/AllInbox";

const drawerWidth: number = 240;

const menuItems: Array<IMenuItems> = [
  {
    id: 1,
    label: "Home",
    icon: <HomeIcon />,
    path: "/dashboard/home",
  },
  {
    id: 2,
    label: "Inventory",
    icon: <InventoryIcon />,
    collapse: true,
    listCollapse: [
      {
        id: 3,
        label: "Category",
        icon: <CategoryIcon />,
        path: "/dashboard/inventory/category",
      },
      {
        id: 4,
        label: "Products",
        icon: <AllInboxIcon />,
        path: "/dashboard/inventory/products",
      },
    ],
  },
  {
    id: 5,
    label: "Users",
    icon: <PersonIcon />,
    path: "/dashboard/users",
  },
];

const Dashboard: FunctionComponent = () => {
  return (
    <SimpleDrawer drawerWidth={drawerWidth} menuItems={menuItems}>
      <Outlet />
    </SimpleDrawer>
  );
};

export default Dashboard;
