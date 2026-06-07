import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import RoomProvider from "./context/RoomContext.jsx";
import AdminAuthProvider from "./context/AdminAuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RoomProvider>
    <AdminAuthProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </AdminAuthProvider>
  </RoomProvider>
);
