import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import PageController from "../components/PageController/PageController";
import Auth from "../components/PageController/Auth";
import CategoryPage from "../pages/Category/CategoryPage";
import styled from "styled-components";
import Register from "../pages/Register/Register";

const HomePageStyle = styled.div`
  display: flex;
  padding: 10px;

  .incomepage {
    display: none; /* Defaultda yashiringan */

    @media (min-width: 1024px) {
      display: block;
      flex: 0 0 400px; /* Faqat bitta o‘lcham */

      position: sticky; /* Sticky xulqini qo‘shish */
      top: 10vh; /* Yuqoridan 26vh masofa */
      max-height: 90vh; //Ichidagi kontentga mos ravishda o‘lchami

      /* margin-left: 20px; */
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }

  .homepage {
    flex: 1;
  }
`;

const Router = ({ transactions }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageController>
            <HomePageStyle>
              <div className="homepage">
                <Home transactions={transactions} />
              </div>
            </HomePageStyle>
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
        path="/create-account"
        element={
          <Auth>
            <Register />
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
      {/* <Route
        path="/new-income"
        element={
          <PageController>
            <NewIncome />
          </PageController>
        }
      />
      <Route
        path="/new-expense"
        element={
          <PageController>
            <NewExpense />
          </PageController>
        }
      /> */}
      <Route path="/*" element={<h1>Not found</h1>} />
    </Routes>
  );
};

export default Router;
