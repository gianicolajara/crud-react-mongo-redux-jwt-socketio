import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import {
  IProduct,
  IProductState,
} from "../interfaces/inventory/inventory.interfaces";

const productInicialState: IProductState = {
  products: [],
};

const productsSlicer: Slice<IProductState> = createSlice({
  name: "productsReducer",
  initialState: productInicialState,
  reducers: {
    //GET_ALL_PRODUCTS
    getAllProducts: {
      reducer: (state: IProductState, action: PayloadAction<IProduct[]>) => {
        console.log(action.payload);

        return {
          products: action.payload,
        };
      },
      prepare: (value: IProduct[]) => {
        return {
          payload: value,
        };
      },
    },
  },
});

export default productsSlicer.reducer;
export const { getAllProducts } = productsSlicer.actions;
