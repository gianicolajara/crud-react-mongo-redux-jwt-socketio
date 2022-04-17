import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import { useDispatch } from "react-redux";
import { getLocalStorage } from "./helpers/localStorage.helper";
import { CLocalStorage } from "./class/locals";
import { setDataAuthAction, setSocketAuthAction } from "./actions/auth.actions";
import { Dispatch } from "redux";
import { socket } from "./helpers/socket.helper";
import { getAllCategories } from "./actions/category.actions";
import { getAllUsersActions } from "./actions/user.actions";

function App() {
  const dispatch: Dispatch<any> = useDispatch();

  //si los datos del usuario ya existen en LS se cargan en el store
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllUsersActions());

    socket.on("connect", () => {
      console.log("connected");
      dispatch(setSocketAuthAction(socket.id));
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    if (getLocalStorage(CLocalStorage.LOCAL_STORAGE_NAME)) {
      const { username, token } = getLocalStorage(
        CLocalStorage.LOCAL_STORAGE_NAME
      );

      dispatch(setDataAuthAction(username, token));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
