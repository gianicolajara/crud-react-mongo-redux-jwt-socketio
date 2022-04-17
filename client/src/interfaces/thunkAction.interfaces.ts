import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";

export type thunkActionType = ThunkAction<void, RootState, unknown, AnyAction>;
