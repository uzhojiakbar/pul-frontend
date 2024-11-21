import React, { useEffect } from "react";
import Router from "../router/router";
import "./root.css";
import { isTokenExpired, logoutUser } from "../utils/auth";
import Cookies from "js-cookie";
import GlobalStyle from "./style";

const Root = () => {
  useEffect(() => {
    const token = Cookies.get("token");
    if (token && isTokenExpired(token)) {
      logoutUser();
      window.location.href = "/login";
    }
  }, []);

  return (
    <div>
      <GlobalStyle />
      <Router />
    </div>
  );
};

export default Root;
