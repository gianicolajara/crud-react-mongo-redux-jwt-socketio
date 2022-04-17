import { Box } from "@mui/material";
import { Dispatch, FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CategoryDashboard from "../components/category/CategoryDashboard";
import Errors from "../components/Errors";
import { socket } from "../helpers/socket.helper";
import { RootState } from "../store";
import { Grid } from "@mui/material";
import { getAllCategories } from "../actions/category.actions";

interface CategoryProps {}

const Category: FC<CategoryProps> = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const { msg, msgType } = useSelector((state: RootState) => state.alert);

  useEffect(() => {
    socket.on("server->category->changes", () => {
      dispatch(getAllCategories());
    });

    return () => {
      socket.removeListener("server->category->changes");
    };
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {msg && (
            <Box marginBottom={2}>
              <Errors msg={msg} severety={msgType} />
            </Box>
          )}
        </Grid>
        <CategoryDashboard />
      </Grid>
    </>
  );
};

export default Category;
