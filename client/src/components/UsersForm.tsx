import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, FormEvent, useContext } from "react";
import { FormUserContext } from "../contexts/formUser.context";
import ButtonGeneric from "./ButtonGeneric";
import SelectGeneric from "./SelectGeneric";
import TextFieldGeneric from "./TextFieldGeneric";

interface IUsersFormProps {
  handleClear: () => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const UsersForm: FC<IUsersFormProps> = ({ handleClear, handleSubmit }) => {
  const {
    useFieldUsername,
    useFieldPassword,
    useFieldEmail,
    useSelectRole,
    typeForm,
  } = useContext(FormUserContext);

  return (
    <Grid item xs={12} lg={4}>
      <Paper sx={{ padding: 3 }}>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          alignItems="left"
          gap={2}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">{typeForm}</Typography>

          <TextFieldGeneric useFieldProp={useFieldUsername} />
          <TextFieldGeneric useFieldProp={useFieldPassword} />
          <TextFieldGeneric useFieldProp={useFieldEmail} />

          <SelectGeneric selectProps={useSelectRole} />

          <Box display="flex" alignSelf="flex-end" gap={1}>
            <ButtonGeneric
              text={typeForm === "Create" ? "Create" : "Update"}
              type="submit"
              variant="contained"
            />
            <ButtonGeneric
              text="Cancel"
              type="button"
              onClick={handleClear}
              variant="contained"
            />
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default React.memo(UsersForm);
