import { Outlet, Navigate } from "react-router-dom";
import React from "react";

const useAuth = () => {
  const access_token = localStorage.getItem("token");

  if (access_token) {
    return {
      auth: true,
    };
  } else {
    return {
      auth: false,
    };
  }
};

const ProtectedRoutes = () => {
  const { auth } = useAuth();
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
