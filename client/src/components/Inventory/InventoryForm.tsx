import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Dispatch } from "redux";
import { isConstructorDeclaration } from "typescript";
import { submitOnFormInventoryAction } from "../../actions/formInventory";
import useFieldRedux from "../../hooks/useFieldRedux";
import useSelectRedux from "../../hooks/useSelectRedux";
import {
  ICategory,
  ICategoryState,
  ICategoryStore,
} from "../../interfaces/categories/category.interfaces";
import { IFormInventoryState } from "../../interfaces/inventory/inventory.interfaces";
import { IUseFieldReduxProps } from "../../interfaces/useFieldReducer/useFieldReducer.interfaces";
import { IUseSelectProps } from "../../interfaces/useSelect.interfaces";
import { typingOnForm } from "../../reducers/formInventory";
import ButtonGeneric from "../ButtonGeneric";
import SelectGeneric from "../SelectGeneric";
import TextFieldRedux from "../TextFieldRedux";

const InventoryForm: FC = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const formIventory = useSelector(
    (state: IFormInventoryState) => state.formInventory
  );

  const categoriesSelector = useSelector(
    (state: ICategoryStore) => state.categories
  );

  const generateCategoriesList = (categories: ICategoryState): any[] => {
    return categories.categories
      .filter((category) => category.activate === true)
      .map((category) => {
        return {
          name: category.name,
          id: category.id,
        };
      });
  };

  const useFielNameRedux: IUseFieldReduxProps = useFieldRedux(
    "text",
    "Name",
    "name",
    typingOnForm,
    "formInventory"
  );

  const useFielPriceRedux: IUseFieldReduxProps = useFieldRedux(
    "number",
    "Price",
    "price",
    typingOnForm,
    "formInventory"
  );

  const useFielDescriptionRedux: IUseFieldReduxProps = useFieldRedux(
    "text",
    "Description",
    "description",
    typingOnForm,
    "formInventory"
  );

  const useSelectCategoryRedux: IUseSelectProps = useSelectRedux(
    "text",
    "Category",
    "category",
    typingOnForm,
    "formInventory",
    generateCategoriesList(categoriesSelector)
  );

  const useFielQuantityRedux: IUseFieldReduxProps = useFieldRedux(
    "number",
    "Quantity",
    "quantity",
    typingOnForm,
    "formInventory"
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(submitOnFormInventoryAction(formIventory.form));
  };

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
        >
          <TextFieldRedux {...useFielNameRedux.props} />
          <TextFieldRedux {...useFielPriceRedux.props} />
          <TextFieldRedux {...useFielDescriptionRedux.props} />
          <SelectGeneric selectProps={useSelectCategoryRedux} />
          <TextFieldRedux {...useFielQuantityRedux.props} />

          <ButtonGeneric text="Send" type="submit" variant="contained" />
        </Box>
      </Paper>
    </>
  );
};

export default InventoryForm;
