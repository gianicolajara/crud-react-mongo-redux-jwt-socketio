import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Users from "../pages/Users";
import { RootState } from "../store";
import Products from "../pages/Products";
import Category from "../pages/Category";

const AppRoutes: FunctionComponent = () => {
  const userSelector: any = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route
        path="/"
        element={userSelector.token ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/dashboard"
        element={userSelector.token ? <Dashboard /> : <Navigate to="/" />}
      >
        <Route path="inventory">
          <Route path="category" element={<Category />} />
          <Route path="products" element={<Products />} />
        </Route>

        <Route path="home" element={<Home />} />
        <Route path="users" element={<Users />} />
      </Route>
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
