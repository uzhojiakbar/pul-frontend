import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, logoutUser } from "../../utils/auth";

const PageController = ({ children }) => {
  if (!isAuthenticated()) {
    logoutUser();
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PageController;
