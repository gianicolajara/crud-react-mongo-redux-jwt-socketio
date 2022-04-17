import React, { Dispatch, FC, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersActions } from "../actions/user.actions";
import { socket } from "../helpers/socket.helper";
import { RootState } from "../store";
import Errors from "../components/Errors";
import DashBoardUsers from "../components/DashboardUsers";
import FormUserProvider from "../contexts/formUser.context";

const Users: FC = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const { msg, msgType } = useSelector((state: RootState) => state.alert);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    socket.on("server->users->change", () => {
      dispatch(getAllUsersActions());
    });

    return () => {
      socket.removeListener("server->users->change");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FormUserProvider>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {msg && (
              <Box marginBottom={2}>
                <Errors msg={msg} severety={msgType} />
              </Box>
            )}
          </Grid>
          <DashBoardUsers />
        </Grid>
      </FormUserProvider>
    </>
  );
};

export default Users;
