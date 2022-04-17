import { Grid } from "@mui/material";
import { FC } from "react";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";

interface CategoryDashboardProps {}

const CategoryDashboard: FC<CategoryDashboardProps> = () => {
  return (
    <>
      <Grid item xs={12} lg={4}>
        <CategoryForm />
      </Grid>
      <Grid item xs={12} lg={8}>
        <CategoryTable />
      </Grid>
    </>
  );
};

export default CategoryDashboard;
