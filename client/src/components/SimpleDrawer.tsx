import React, { FC, useState } from "react";
import {
  AppBar,
  Collapse,
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { ISimpleDrawerProps } from "../interfaces/simpleDrawer.interfaces";
import ChangeTheme from "./ChangeTheme";
import LogOut from "./LogOut";
import { IMenuItems } from "../interfaces/dashboard.interfaces";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

interface IOpenMenuProps {
  [key: string]: boolean;
}

const initialOpenMenu: IOpenMenuProps = {
  inventory: false,
};

const SimpleDrawer: FC<ISimpleDrawerProps> = ({
  drawerWidth,
  menuItems,
  children,
}) => {
  const [open, setOpen] = useState<IOpenMenuProps>(initialOpenMenu);

  const handleClick = (label: string) => {
    setOpen({ ...open, [label]: !open[label] });
  };

  return (
    <Box display="flex">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Dashboard</Typography>
          <Box>
            <LogOut />
            <ChangeTheme />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        open
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItems.map((item: IMenuItems, index) =>
              item.collapse ? (
                <Box key={item.id}>
                  <ListItemButton
                    onClick={() => {
                      handleClick(item.label.toLowerCase());
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText>{item.label}</ListItemText>
                    {open[item.label.toLowerCase()] ? (
                      <ArrowDropUpIcon color="primary" />
                    ) : (
                      <ArrowDropDownIcon color="primary" />
                    )}
                  </ListItemButton>
                  <Collapse
                    in={open[item.label.toLowerCase()]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List sx={{ marginLeft: "1rem" }}>
                      {item.listCollapse?.map((itemCollapse: IMenuItems) => (
                        <ListItemButton
                          key={itemCollapse.id}
                          component={Link}
                          to={itemCollapse.path || "/"}
                        >
                          <ListItemIcon>{itemCollapse.icon}</ListItemIcon>
                          <ListItemText>{itemCollapse.label}</ListItemText>
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              ) : (
                <ListItemButton
                  key={item.id}
                  component={Link}
                  to={item.path || "/"}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              )
            )}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ padding: 3, width: `calc(100% - ${drawerWidth}px)` }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default SimpleDrawer;
