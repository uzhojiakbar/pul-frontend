import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import PageController from "../components/PageController/PageController";
import Auth from "../components/PageController/Auth";
import CategoryPage from "../pages/Category/CategoryPage";
import NewIncome from "../pages/NewIncome/NewIncome";
import NewExpense from "../pages/NewExpense/NewIncome";
import styled from "styled-components";
import Register from "../pages/Register/Register";

const HomePageStyle = styled.div`
  display: flex;
  gap: 20px;

  .incomepage {
    display: none; /* Defaultda yashiringan */

    @media (min-width: 1024px) {
      display: block;
      flex: 0 0 400px; /* Faqat bitta o‘lcham */

      position: sticky; /* Sticky xulqini qo‘shish */
      top: 10vh; /* Yuqoridan 26vh masofa */
      height: 90vh; /* Ichidagi kontentga mos ravishda o‘lchami */

      margin-left: 20px;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }

  .homepage {
    flex: 1;
  }
`;

const ToggleButtons = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    button {
      flex: 1;
      padding: 10px 15px;
      border: 2px solid #e0e0e0;
      background-color: #f9f9f9;
      color: #4caf50;
      font-weight: bold;
      font-size: 16px;
      border-radius: 8px;
      cursor: pointer;
      text-align: center;

      &.active {
        background-color: #4caf50;
        color: white;
      }

      &:hover {
        background-color: #e8f5e9;
      }

      &:first-child {
        margin-right: 10px;
      }
    }
  }
`;

const Router = ({ transactions }) => {
  const [selectedPage, setSelectedPage] = useState("income"); // Default: Kirim

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageController>
            <HomePageStyle>
              <div className="incomepage">
                {/* Kirim va Chiqim tugmalari */}
                <ToggleButtons>
                  <button
                    onClick={() => setSelectedPage("income")}
                    className={selectedPage === "income" ? "active" : ""}
                  >
                    Kirim
                  </button>
                  <button
                    onClick={() => setSelectedPage("expense")}
                    className={selectedPage === "expense" ? "active" : ""}
                  >
                    Chiqim
                  </button>
                </ToggleButtons>

                {/* Tanlangan sahifa */}
                {selectedPage === "income" ? (
                  <NewIncome home={1} />
                ) : (
                  <NewExpense home={1} />
                )}
              </div>
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
      <Route
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
      />
      <Route path="/*" element={<h1>Not found</h1>} />
    </Routes>
  );
};

export default Router;
