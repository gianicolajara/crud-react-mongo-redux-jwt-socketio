import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IAuthLoginProps,
  IAuthSocketId,
  IAuthState,
} from "../interfaces/auth.interfaces";

export const initialState: IAuthState = {
  userData: {
    username: null,
  },
  socketId: null,
  token: null,
};

const nameAuthSlice: string = "auth";

const authSlice = createSlice({
  name: nameAuthSlice,
  initialState: initialState,
  reducers: {
    //LOGIN
    login: {
      reducer: (state: IAuthState, action: PayloadAction<IAuthLoginProps>) => {
        const { username, token } = action.payload;

        return {
          ...state,
          userData: {
            username,
          },
          token,
        };
      },
      prepare: (value: IAuthLoginProps) => {
        const { username, token } = value;
        return {
          payload: {
            username,
            token,
          },
        };
      },
    },
    //LOGOUT
    logout: (state: IAuthState, action: PayloadAction<void | unknown>) =>
      initialState,
    //SET SOCKET ID
    setSocketId: {
      reducer: (state: IAuthState, action: PayloadAction<IAuthSocketId>) => {
        return {
          ...state,
          socketId: action.payload.socketId,
        };
      },
      prepare: (value: IAuthSocketId) => {
        const { socketId } = value;
        return {
          payload: {
            socketId,
          },
        };
      },
    },
  },
});

export default authSlice.reducer;
export const { login, logout, setSocketId } = authSlice.actions;
