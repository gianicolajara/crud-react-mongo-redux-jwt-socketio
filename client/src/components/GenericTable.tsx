import React, { FC, useState } from "react";
import {
  OutlinedTextFieldProps,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import HeaderTable from "./HeaderTable";
import BodyTable from "./BodyTable";
import { IGenericTableProps } from "../interfaces/genericTable.interfaces";
import Spinning from "./loaders/Spinning";

const GenericTable: FC<IGenericTableProps> = ({
  headers,
  rows,
  actions,
  pages,
  numberRows,
  showTextField = false,
  textFieldFinterProps,
}) => {
  const [page, setPage] = useState(pages || 0);
  const [rowsPerPage, setRowsPerPage] = useState(numberRows || 5);

  const handleChangePage = (
    e: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {headers && rows ? (
        <TableContainer sx={{ minWidth: "100%" }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <HeaderTable headers={headers} />
              </TableRow>
            </TableHead>
            <TableBody>
              <BodyTable
                rows={
                  rowsPerPage > 0
                    ? rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : rows
                }
                actions={actions}
              />
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <Spinning />
      )}
    </>
  );
};

export default GenericTable;
