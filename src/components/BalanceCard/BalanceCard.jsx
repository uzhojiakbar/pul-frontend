import React, { useState } from "react";
import styled from "styled-components";
import {
  WalletOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";

import { useBalance } from "../../hook/useBalance";
import Loading from "../Loading/Loading";
import NewExpense from "../../pages/NewExpense/NewIncome";
import NewIncome from "../../pages/NewIncome/NewIncome";
import Sidebar from "../Sidebar/Sidebar";

const Card = styled.div`
  margin: 0 16px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-height: 15vh; // Maximal balandlik
  min-height: 100px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4px;
`;

const TotalBalance = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #4caf50;
`;

const SubBalances = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 8px;
  gap: 5px;
`;

const SubBalanceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
  color: #757575;
`;

const Divider = styled.div`
  height: 24px;
  width: 1px;
  background-color: #e0e0e0;
`;

const Amount = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #4caf50;
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

  @media (max-width: 1024px) {
    display: none;
  }
`;

const BalanceCard = () => {
  const { data: balance, isLoading } = useBalance();

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
    <Card>
      {loading && <Loading />}

      <TotalBalance>Umumiy hisob: UZS {balance?.all?.uzs}</TotalBalance>
      <SubBalances>
        <Button onClick={toggleDrawer2} color="#f44336">
          -
        </Button>{" "}
        <SubBalanceItem>
          <WalletOutlined style={{ fontSize: "16px", color: "#4caf50" }} />
          <Amount>{balance?.uzs.toLocaleString()} UZS </Amount>
        </SubBalanceItem>
        <Divider />
        <SubBalanceItem>
          <DollarCircleOutlined
            style={{ fontSize: "16px", color: "#4caf50" }}
          />
          <Amount> {balance?.usd.toLocaleString()} USD</Amount>
        </SubBalanceItem>
        <Button onClick={toggleDrawer} color="#4caf50">
          +
        </Button>
      </SubBalances>

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
    </Card>
  );
};

export default BalanceCard;
