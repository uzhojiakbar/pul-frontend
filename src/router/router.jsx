import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import PageController from "../components/PageController/PageController";
import Auth from "../components/PageController/Auth";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageController>
            <Home />
          </PageController>
        }
      />
      <Route
        path="/login"
        element={
          <Auth>
            <Login />
          </Auth>
        }
      />
      <Route path="/*" element={<h1>Not found</h1>} />
    </Routes>
  );
};

export default Router;
