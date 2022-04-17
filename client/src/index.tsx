import React, { useEffect } from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import ThemeContextProviderApp from "./contexts/theme.context";
import storeApp from "./store";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

function AppWithCallbackAfterRender() {
  useEffect(() => {
    console.log("rendered");
  });

  return (
    <React.StrictMode>
      <Provider store={storeApp}>
        <ThemeContextProviderApp>
          <CssBaseline />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeContextProviderApp>
      </Provider>
    </React.StrictMode>
  );
}

const container = document.getElementById("root");

const root = createRoot(container as Element);

root.render(<AppWithCallbackAfterRender />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
