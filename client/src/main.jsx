import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <ToastContainer />
    </AuthProvider>
  </BrowserRouter>
);
