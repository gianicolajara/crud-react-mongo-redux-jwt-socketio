import { IFormErrorInitialState } from "../interfaces/formError.interfaces";
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

const initialState: IFormErrorInitialState = {
  errors: null,
};

const formErrorSlice: Slice<IFormErrorInitialState> = createSlice({
  name: "formError",
  initialState: initialState,
  reducers: {
    //SET ERROR
    setFormError: {
      reducer: (
        state: IFormErrorInitialState,
        action: PayloadAction<IFormErrorInitialState>
      ) => {
        return {
          ...action.payload,
        };
      },
      prepare: (value) => {
        return {
          payload: {
            errors: value,
          },
        };
      },
    },
    //REMOVE ERROR
    removeFormError: (
      state: IFormErrorInitialState,
      action: PayloadAction<void | undefined>
    ) => initialState,
  },
});

export default formErrorSlice.reducer;
export const { setFormError, removeFormError } = formErrorSlice.actions;
