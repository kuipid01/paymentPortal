import React from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import Login from "../pages/Login/Login";

const ProtectedRoute = ({ element: Element, isAuthenticated, fallbackPath, ...props }) => {
  const isLoggedIn = !!JSON.parse(sessionStorage.getItem("curUser"));
const navigate = useNavigate()
  return (
    <Route
      {...props}
      element={isAuthenticated ? <Element /> : <Login/> }
    ></Route>
  );
};

export default ProtectedRoute;