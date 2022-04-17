import { Button } from "@mui/material";
import React, { FC } from "react";

interface IButtonGeneric {
  variant: "text" | "outlined" | "contained" | undefined;
  text: string;
  onClick?: () => void;
  type: "button" | "submit" | "reset" | undefined;
}

const ButtonGeneric: FC<IButtonGeneric> = ({
  variant,
  text,
  onClick,
  type,
}) => {
  return (
    <Button variant={variant} onClick={onClick} type={type}>
      {text}
    </Button>
  );
};

export default React.memo(ButtonGeneric);
