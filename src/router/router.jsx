import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import PageController from "../components/PageController/PageController";
import Auth from "../components/PageController/Auth";
import CategoryPage from "../pages/Category/CategoryPage";
import NewIncome from "../pages/NewIncome/NewIncome";
// import Categories from "../pages/Categories/Categories"; // Categories sahifasi

const Router = ({ transactions }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageController>
            <Home transactions={transactions} />
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
      <Route
        path="/categories"
        element={
          <PageController>
            <CategoryPage />
          </PageController>
        }
      />

      <Route
        path="/new-income"
        element={
          <PageController>
            <NewIncome />
          </PageController>
        }
      />
      {/* <Route path="/new-expense" element={<NewExpense />} /> */}
      <Route path="/*" element={<h1>Not found</h1>} />
    </Routes>
  );
};

export default Router;
