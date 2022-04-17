import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { IAlert } from "../interfaces/alert.interfaces";

const initialState: IAlert = {
  msg: null,
  msgType: null,
};

const nameAlertSlice: string = "alert";

const alertSlice: Slice<IAlert> = createSlice({
  name: nameAlertSlice,
  initialState: initialState,
  reducers: {
    //SET ALERT
    setAlert: {
      reducer: (state: IAlert, action: PayloadAction<IAlert>) => {
        return {
          ...action.payload,
        };
      },
      prepare: (value: IAlert) => {
        console.log("el value es");
        console.log(value);

        return {
          payload: {
            msg: value.msg,
            msgType: value.msgType,
          },
        };
      },
    },
    //REMOVE ALERT
    removeAlert: (state: IAlert, action: PayloadAction<void | unknown>) =>
      initialState,
  },
});

export default alertSlice.reducer;
export const { setAlert, removeAlert } = alertSlice.actions;
