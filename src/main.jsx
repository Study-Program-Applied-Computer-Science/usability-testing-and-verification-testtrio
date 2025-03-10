import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";  // Import Provider from react-redux
import store from "./redux/store";  // Ensure correct path to your Redux store
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap the app with Provider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
