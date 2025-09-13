import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { FoodContextProvider } from "./Context/Context.jsx";

createRoot(document.getElementById("root")).render(
  <FoodContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FoodContextProvider>
);
