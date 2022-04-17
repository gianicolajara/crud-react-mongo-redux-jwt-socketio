import { Checkbox, Grid, IconButton } from "@mui/material";
import React, { FC, useState } from "react";
import { IUser } from "../interfaces/user.interfaces";
import EditIcon from "@mui/icons-material/Edit";

import { GridCallbackDetails, GridColDef } from "@mui/x-data-grid";
import ButtonRoles from "./ButtonRoles";
import { showDate } from "../helpers/dates.helper";
import DataGridGeneric from "./DataGridGeneric";

interface ITableUserProps {
  selectorUsers: Array<IUser>;
  handleUpdate: (user: IUser) => void;
  deleteAction: (id: string, active: boolean) => void;
}

const TableUser: FC<ITableUserProps> = ({
  selectorUsers,
  handleUpdate,
  deleteAction,
}) => {
  const [page, setPage] = useState(5);

  const generateBodyUserTable = (user: Array<IUser>): Array<any> => {
    if (!user) return [];
    return user.map((user: IUser) => {
      const { id, active, username, email, createdAt, updatedAt, roles } = user;
      return {
        id,
        active,
        username,
        email,
        createdAt: showDate(createdAt),
        updatedAt: showDate(updatedAt),
        roles,
      };
    });
  };

  const headerTableGrid: GridColDef[] = [
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              handleUpdate(params.row);
            }}
          >
            <EditIcon />
          </IconButton>
        );
      },
    },
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "active",
      headerName: "Active",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        const { active, id } = params.row;

        return (
          <Checkbox
            checked={params.row.active}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement>,
              checked: boolean
            ) => {
              deleteAction(id, !active);
            }}
          />
        );
      },
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "roles",
      headerName: "Role",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return <ButtonRoles roles={params.row.roles} />;
      },
    },
  ];

  const onPageSizeChange = (pageSize: number, details: GridCallbackDetails) => {
    setPage(pageSize);
  };

  return (
    <Grid item xs={12} lg={8}>
      <DataGridGeneric
        rows={generateBodyUserTable(selectorUsers)}
        columns={headerTableGrid}
        pageSize={page}
        onPageSizeChange={onPageSizeChange}
        rowsPerPageOptions={[5, 10, 20, 100]}
        loading={!selectorUsers}
        autoHeight={true}
      />
    </Grid>
  );
};

export default React.memo(TableUser, (prevProps, nextProps) => {
  return prevProps.selectorUsers === nextProps.selectorUsers;
});
