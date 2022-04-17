import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICategory,
  ICategoryState,
} from "../interfaces/categories/category.interfaces";

const initialState: ICategoryState = {
  categories: [],
};

const categoriesSlicer = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    setAllCategories: {
      reducer: (
        state: ICategoryState,
        action: PayloadAction<ICategoryState>
      ) => {
        return {
          categories: action.payload.categories,
        };
      },
      prepare: (values: ICategory[]) => {
        return {
          payload: {
            categories: values,
          },
        };
      },
    },
    addCategory: {
      reducer: (state: ICategoryState, action: PayloadAction<ICategory>) => {
        return {
          categories: [...state.categories, action.payload],
        };
      },
      prepare: (value: ICategory) => {
        return {
          payload: value,
        };
      },
    },
    updateCategory: (
      state: ICategoryState,
      action: PayloadAction<ICategory>
    ) => {
      return {
        categories: state.categories.map((category) =>
          action.payload.id === category.id ? { ...action.payload } : category
        ),
      };
    },
    desactivatedCategory: {
      reducer: (state: ICategoryState, action: PayloadAction<ICategory>) => {
        return {
          categories: state.categories.map((category: ICategory) => {
            return category.id === action.payload.id
              ? { ...category, activate: !category.activate }
              : category;
          }),
        };
      },
      prepare: (value: ICategory) => {
        return {
          payload: value,
        };
      },
    },
  },
});

export default categoriesSlicer.reducer;
export const { setAllCategories, addCategory, desactivatedCategory } =
  categoriesSlicer.actions;
