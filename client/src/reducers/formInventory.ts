import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { typeOfForm } from "../enums/formUser.enum";
import { IProductForm } from "../interfaces/inventory/inventory.interfaces";

const initialStateFormInventory: IProductForm = {
  typeOfForm: typeOfForm.create,
  form: {
    name: "",
    price: 0,
    description: "",
    image: "",
    category: "",
    quantity: 0,
  },
};

const formIventorySlice: Slice<IProductForm> = createSlice({
  name: "formInventory",
  initialState: initialStateFormInventory,
  reducers: {
    //TYPING_ON_FORM
    typingOnForm: {
      reducer: (state: IProductForm, action: PayloadAction<IProductForm>) => {
        return {
          ...state,
          form: {
            ...state.form,
            ...action.payload.form,
          },
        };
      },
      prepare: (value: IProductForm) => {
        return {
          payload: {
            ...value,
          },
        };
      },
    },
    //SUBMIT_FORM
    submitForm: (
      state: IProductForm,
      action: PayloadAction<void | undefined>
    ) => initialStateFormInventory,
    clearForm: (state: IProductForm, action: PayloadAction<void | undefined>) =>
      initialStateFormInventory,
  },
});

export default formIventorySlice.reducer;
export const { typingOnForm, submitForm, clearForm } =
  formIventorySlice.actions;
