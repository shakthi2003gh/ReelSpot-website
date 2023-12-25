import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import StateProvider from "./state";
import App from "./App";
import Auth from "./pages/auth";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StateProvider>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<App />} />
        </Routes>
      </StateProvider>

      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);
