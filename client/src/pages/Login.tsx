import { Box, Container, Grid } from "@mui/material";
import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import Errors from "../components/Errors";
import LoginWindow from "../components/LoginWindow";
import { RootState } from "../store";

const Login: FunctionComponent = () => {
  const { msg, msgType } = useSelector((state: RootState) => state.alert);

  return (
    <>
      <Container maxWidth="xl">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
        >
          <Grid item xs={12} xl={8} md={6} lg={4}>
            {msg && (
              <Box marginBottom={2}>
                <Errors msg={msg} severety={msgType} />
              </Box>
            )}
            <LoginWindow />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
