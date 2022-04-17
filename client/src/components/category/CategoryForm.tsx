import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { submitCategoryFormAction } from "../../actions/categoryForm.actions";
import useFieldRedux from "../../hooks/useFieldRedux";
import { ICategoryFormState } from "../../interfaces/categories/category.interfaces";
import { IUseFieldReduxProps } from "../../interfaces/useFieldReducer/useFieldReducer.interfaces";
import { resetCategoryForm, typingCategory } from "../../reducers/formCategory";
import ButtonGeneric from "../ButtonGeneric";
import TextFieldRedux from "../TextFieldRedux";
import { typeOfForm } from "../../enums/formUser.enum";

const initialTypeOfFormCategory: typeOfForm = typeOfForm.create;

const CategoryForm: FC = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const useSelectorCategoryForm = useSelector(
    (state: ICategoryFormState) => state.formCategory
  );

  const useFielNameCategoryRedux: IUseFieldReduxProps = useFieldRedux(
    "text",
    "Name",
    "name",
    typingCategory,
    "formCategory"
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(submitCategoryFormAction(useSelectorCategoryForm.form));
    },
    [useSelectorCategoryForm]
  );

  const handleResetForm = useCallback(() => {
    dispatch(resetCategoryForm({}));
  }, []);

  return (
    <>
      <Paper>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          padding={3}
          gap={3}
          onSubmit={handleSubmit}
          onReset={handleResetForm}
        >
          <Typography component="h2" variant="h6">
            {useSelectorCategoryForm.typeOfForm}
          </Typography>
          <TextFieldRedux {...useFielNameCategoryRedux.props} />

          <Box display="flex" gap={1} justifyContent="flex-end">
            <ButtonGeneric text="Send" type="submit" variant="contained" />
            <ButtonGeneric text="Clear" type="reset" variant="contained" />
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default CategoryForm;
