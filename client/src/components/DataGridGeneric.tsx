import { DataGrid, GridCallbackDetails } from "@mui/x-data-grid";
import React, { FC } from "react";

interface DataGridGenericProps {
  rows: any[];
  columns: any[];
  pageSize: number;
  onPageSizeChange: (pageSize: number, details: GridCallbackDetails) => void;
  rowsPerPageOptions: number[];
  loading: boolean;
  autoHeight: boolean;
}

const DataGridGeneric: FC<DataGridGenericProps> = ({
  rows,
  columns,
  pageSize,
  onPageSizeChange,
  rowsPerPageOptions,
  loading,
  autoHeight,
}) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      onPageSizeChange={onPageSizeChange}
      rowsPerPageOptions={rowsPerPageOptions}
      loading={loading}
      autoHeight={true}
    />
  );
};

export default React.memo(DataGridGeneric);
