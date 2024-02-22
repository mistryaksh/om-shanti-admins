import React from "react";
import { GetAuthToken } from "../../utils";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectRoute = () => {
     const token = GetAuthToken();
     if (token) {
          return <Outlet />;
     } else {
          return <Navigate to="/" replace />;
     }
};
