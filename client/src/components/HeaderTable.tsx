import { TableCell } from "@mui/material";
import React, { FC } from "react";
import PropTypes from "prop-types";
import { IHeaderTableProps } from "../interfaces/genericTable.interfaces";

const HeaderTable: FC<IHeaderTableProps> = ({ headers }) => {
  return (
    <>
      {headers &&
        headers.map((header: string) => (
          <TableCell key={header}>{header}</TableCell>
        ))}
    </>
  );
};

HeaderTable.propTypes = {
  headers: PropTypes.array.isRequired,
};

export default HeaderTable;
