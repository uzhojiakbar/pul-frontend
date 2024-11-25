import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../Sidebar/Sidebar";
import NewIncome from "../../pages/NewIncome/NewIncome";
import Loading from "../Loading/Loading";
import NewExpense from "../../pages/NewExpense/NewIncome";

const ButtonsWrapper = styled.div`
  display: none;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 80px;
  backdrop-filter: blur(4px);
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: 1024px) {
    display: none;
  }
`;

const Button = styled.button`
  width: 60px;
  height: 60px;
  background-color: ${({ color }) => color};
  border: none;
  border-radius: 50%;
  font-size: 24px;
  color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
  }
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.9;
  }
`;

const ActionButtons = () => {
  const [isSidebarOpenIncome, setSidebarOpenIncome] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleDrawer = () => {
    setSidebarOpenIncome(!isSidebarOpenIncome);
  };
  const [isSidebarOpenExpene, setSidebarOpenExpense] = useState(false);
  const toggleDrawer2 = () => {
    setSidebarOpenExpense(!isSidebarOpenExpene);
  };
  return (
    <>
      {loading && <Loading />}

      <ButtonsWrapper>
        <Button onClick={toggleDrawer2} color="#f44336">
          -
        </Button>
        <Button onClick={toggleDrawer} color="#4caf50">
          +
        </Button>
      </ButtonsWrapper>

      <Sidebar
        title="Income qo'shsh"
        isOpen={isSidebarOpenIncome}
        onClose={toggleDrawer}
      >
        <NewIncome
          loading={loading}
          setLoading={setLoading}
          close={toggleDrawer}
        />
      </Sidebar>
      <Sidebar
        direction="left"
        title="Expense qo'shsh"
        isOpen={isSidebarOpenExpene}
        onClose={toggleDrawer2}
      >
        <NewExpense
          loading={loading}
          setLoading={setLoading}
          close={toggleDrawer2}
        />
      </Sidebar>
    </>
  );
};

export default ActionButtons;
