import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import { message } from "antd";

const Auth = ({ children }) => {
  if (isAuthenticated()) {
    message.info("siz oldin ro'yxatdan otgansiz");
    return <Navigate to="/" />;
  }
  return children;
};

export default Auth;
