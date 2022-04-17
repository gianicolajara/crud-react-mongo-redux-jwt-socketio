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

interface CategoryTableProps {}

const initialPages: number = 5;
const tableConfigPages: number[] = [5, 10, 100];

const CategoryTable: FC<CategoryTableProps> = () => {
  const [page, setPage] = useState(initialPages);

  const dispatch: Dispatch<any> = useDispatch();

  const selectorCategories: ICategoryState = useSelector(
    (state: ICategoryStore) => state.categories
  );

  const headerCategoryDataGrid: GridColDef[] = [
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 50,
      flex: 1,
      renderCell: (params) => {
        const rowSelected: ICategoryFormInputs = {
          id: params.row.id,
          activate: params.row.activate,
          createdAt: params.row.createdAt,
          updatedAt: params.row.updatedAt,
          name: params.row.name,
        };

        return (
          <IconButton
            onClick={() => {
              dispatch(getItemInformationToUpdate(rowSelected));
            }}
          >
            <EditIcon />
          </IconButton>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "active",
      headerName: "Active",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <Checkbox
            checked={params.row.activate}
            onClick={() => {
              dispatch(toggleActivateCategoryAction(params.row));
            }}
          />
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "updatedAt",
      headerName: "Updated Date",
      minWidth: 100,
      flex: 1,
    },
  ];

  const generateCategoryRows = (categories: ICategoryState): any[] => {
    return categories.categories.map((category: ICategory) => {
      return {
        ...category,
        createdAt: showDate(category.createdAt),
        updatedAt: showDate(category.updatedAt),
      };
    });
  };

  const onPageSizeChange = (pageSize: number, details: GridCallbackDetails) => {
    setPage(pageSize);
  };

  return (
    <DataGridGeneric
      columns={headerCategoryDataGrid}
      rows={generateCategoryRows(selectorCategories)}
      pageSize={page}
      loading={!selectorCategories}
      rowsPerPageOptions={tableConfigPages}
      autoHeight={true}
      onPageSizeChange={onPageSizeChange}
    />
  );
};

export default CategoryTable;
