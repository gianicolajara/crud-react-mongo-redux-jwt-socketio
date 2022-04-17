import React, { Dispatch, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProductsActions } from "../actions/products.actions";
import InventoryDashboard from "../components/Inventory/InventoryDashboard";

const Products = () => {
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsActions());
  }, []);

  return <InventoryDashboard />;
};

export default Products;
