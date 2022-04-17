import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { typeOfForm } from "../enums/formUser.enum";
import {
  ICategoryForm,
  ICategoryFormInputs,
} from "../interfaces/categories/category.interfaces";

const initialState: ICategoryForm = {
  typeOfForm: typeOfForm.create,
  form: {
    name: "",
  },
};

const formCategorySlice: Slice<ICategoryForm> = createSlice({
  name: "formCategory",
  initialState: initialState,
  reducers: {
    //TYPING_CATEGORY
    typingCategory: {
      reducer: (state: ICategoryForm, action: PayloadAction<ICategoryForm>) => {
        return {
          ...state,
          form: {
            ...state.form,
            ...action.payload.form,
          },
        };
      },
      prepare: (value: ICategoryForm) => {
        return {
          payload: {
            ...value,
          },
        };
      },
    },
    //SEND_CATEGORY
    resetCategoryForm: (
      state: ICategoryForm,
      action: PayloadAction<ICategoryForm>
    ) => initialState,
    //SET_CATEGORY_ITEM
    setCategoryItem: (
      state: ICategoryForm,
      action: PayloadAction<ICategoryFormInputs>
    ) => {
      return {
        typeOfForm: typeOfForm.update,
        form: {
          ...action.payload,
        },
      };
    },
  },
});

export default formCategorySlice.reducer;
export const { typingCategory, resetCategoryForm, setCategoryItem } =
  formCategorySlice.actions;
