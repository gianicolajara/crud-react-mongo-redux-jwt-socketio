import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginForm from "./LoginForm";

const LoginWindow: FC = () => {
  return (
    <Paper>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={10}
        gap={2}
      >
        <AccountCircleIcon
          color="primary"
          sx={{
            fontSize: "7rem",
          }}
        />
        <LoginForm />
      </Box>
    </Paper>
  );
};

export default LoginWindow;
