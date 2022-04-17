import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ICategory,
  ICategoryFormInputs,
  ICategoryState,
  ICategoryStore,
} from "../../interfaces/categories/category.interfaces";
import { GridCallbackDetails, GridColDef } from "@mui/x-data-grid";
import DataGridGeneric from "../DataGridGeneric";
import { showDate } from "../../helpers/dates.helper";
import { Checkbox, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  getItemInformationToUpdate,
  toggleActivateCategoryAction,
} from "../../actions/category.actions";
import { Dispatch } from "redux";
import {
  IProduct,
  IProductStore,
} from "../../interfaces/products/products.interfaces";

interface CategoryTableProps {}

const initialPages: number = 5;
const tableConfigPages: number[] = [5, 10, 100];

const InventoryTable: FC<CategoryTableProps> = () => {
  const [page, setPage] = useState(initialPages);

  const dispatch: Dispatch<any> = useDispatch();

  const selectorProducts = useSelector(
    (state: IProductStore) => state.products
  );

  const headerProductDataGrid: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 100,
      flex: 1,
    },
  ];

  const onPageSizeChange = (pageSize: number, details: GridCallbackDetails) => {
    setPage(pageSize);
  };

  return (
    <>
      <DataGridGeneric
        columns={headerProductDataGrid}
        rows={selectorProducts.products}
        pageSize={page}
        loading={!selectorProducts}
        rowsPerPageOptions={tableConfigPages}
        autoHeight={true}
        onPageSizeChange={onPageSizeChange}
      />
    </>
  );
};

export default InventoryTable;
