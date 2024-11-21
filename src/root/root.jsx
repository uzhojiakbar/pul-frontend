import React, { useEffect } from "react";
import Router from "../router/router";
import "./root.css";
import { isTokenExpired, logoutUser } from "../utils/auth";
import Cookies from "js-cookie";

const Root = () => {
  useEffect(() => {
    const token = Cookies.get("token");
    if (token && isTokenExpired(token)) {
      logoutUser(); // Agar token muddati tugagan bo‘lsa, logout qilamiz
      window.location.href = "/login"; // Login sahifasiga yo‘naltirish
    }
  }, []);
  return (
    <div>
      <Router />
    </div>
  );
};

export default Root;
