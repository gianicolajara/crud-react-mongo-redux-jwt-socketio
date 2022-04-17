import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";

const Spinning: FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <CircularProgress />
    </Box>
  );
};

export default Spinning;
