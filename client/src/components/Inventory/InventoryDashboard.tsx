import { Grid } from "@mui/material";
import { Dispatch, FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearFormInventoryAction } from "../../actions/formInventory";
import InventoryForm from "./InventoryForm";
import InventoryTable from "./InventoryTable";

const InventoryDashboard: FC = () => {
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearFormInventoryAction());
    };
  });

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <InventoryForm />
        </Grid>
        <Grid item xs={12} lg={4}>
          <InventoryTable />
        </Grid>
      </Grid>
    </>
  );
};

export default InventoryDashboard;
