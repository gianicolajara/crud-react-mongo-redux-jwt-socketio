import { createStore, Store, applyMiddleware, combineReducers } from "redux";
import authReducer from "../reducers/auth";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import alertReducer from "../reducers/alert";
import themeReducer from "../reducers/theme";
import { usersReducer } from "../reducers/users";
import formErrorReducer from "../reducers/formError";
import FormInventoryReducer from "../reducers/formInventory";
import formCategoryReducer from "../reducers/formCategory";
import categoriesReducer from "../reducers/categories";
import productsReducer from "../reducers/products";

const conbinedReducersApp = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  theme: themeReducer,
  users: usersReducer,
  formErrors: formErrorReducer,
  formInventory: FormInventoryReducer,
  formCategory: formCategoryReducer,
  categories: categoriesReducer,
  products: productsReducer,
});

const storeApp: Store = createStore(
  conbinedReducersApp,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

storeApp.subscribe(() => {
  //cambios
});

export type RootState = ReturnType<typeof storeApp.getState>;
export type AppDispatch = typeof storeApp.dispatch;

export default storeApp;
