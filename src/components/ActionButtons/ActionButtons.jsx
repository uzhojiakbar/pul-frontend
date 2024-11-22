import React, { useState } from "react";
import styled from "styled-components";
import AddTransactionModal from "../AddTransactionModal/AddTransactionModal"; // Yangi Modal komponentini import qilish
import { NavLink } from "react-router-dom";

const ButtonsWrapper = styled.div`
  display: flex;
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
  const [isIncomeModalOpen, setIncomeModalOpen] = useState(false); // Kirim modal holati
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false); // Chiqim modal holati

  return (
    <>
      <ButtonsWrapper>
        <NavLink to={"/new-income"}>
          <Button color="#f44336">-</Button>
        </NavLink>
        <NavLink to={"/new-income"}>
          <Button color="#4caf50">+</Button>
        </NavLink>
      </ButtonsWrapper>
    </>
  );
};

export default ActionButtons;
