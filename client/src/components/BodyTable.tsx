import { IconButton, TableCell, TableRow } from "@mui/material";
import React, { FC } from "react";
import {
  IBodyTableProps,
  IGenericTableActionsProps,
} from "../interfaces/genericTable.interfaces";
import PropTypes from "prop-types";
import { Box } from "@mui/system";

const BodyTable: FC<IBodyTableProps> = ({ rows, actions }) => {
  const rowsKeys = Object.keys(rows[0]);
  if (rowsKeys.length === 0) return null;
  return (
    <>
      {rows &&
        rows.map((row: any) => (
          <TableRow key={row.id}>
            {actions && (
              <TableCell>
                <Box display="flex">
                  {actions.map((action: IGenericTableActionsProps) => (
                    <IconButton
                      key={action.id}
                      onClick={() => action.clickFunction(row)}
                    >
                      {action.icon}
                    </IconButton>
                  ))}
                </Box>
              </TableCell>
            )}
            {rowsKeys.map((key: string) => (
              <TableCell key={key}>{row[key]}</TableCell>
            ))}
          </TableRow>
        ))}
    </>
  );
};

BodyTable.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default BodyTable;
