import { Chip } from "@mui/material";
import React, { FC } from "react";
import { enumRoles } from "../enums/roles.enum";
import {
  ITypeOfColors,
  IButtonRolesProps,
} from "../interfaces/colorsRoles.interfaces";

const typeOfColors: ITypeOfColors = {
  [enumRoles.admin]: "success",
  [enumRoles.user]: "error",
};

const ButtonRoles: FC<IButtonRolesProps> = ({ roles }) => {
  return (
    <>
      {roles.map((role: string) => {
        return (
          <Chip
            key={role}
            label={role}
            color={typeOfColors[role]}
            sx={{ color: "white" }}
          />
        );
      })}
    </>
  );
};

export default ButtonRoles;
