import React, { useState } from "react";
import styled from "styled-components";
import {
  WalletOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
  MinusCircleFilled,
  MinusOutlined,
} from "@ant-design/icons";

import { useBalance } from "../../hook/useBalance";
import Loading from "../Loading/Loading";
import NewExpense from "../../pages/NewExpense/NewIncome";
import NewIncome from "../../pages/NewIncome/NewIncome";
import Sidebar from "../Sidebar/Sidebar";

const Card = styled.div`
  margin: 0 16px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-height: 18vh; // Maximal balandlik
  min-height: 100px;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  gap: 4px;

  position: relative;
`;

const TotalBalance = styled.div`
  font-size: 24px;
  font-weight: bold;
  background: rgba(76, 175, 80, 0.7);
  font-weight: 900;
  padding: 16px;
  border-radius: 8px;
  color: white;

  -webkit-text-stroke: 1px rgba(0, 0, 0, 0.2);
`;

const MainMiddle = styled.div`
  width: 70%;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const SubBalances = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch; /* Elementlarni butun balandlikka cho'zish */
  height: 60px;
  margin-top: 8px;
`;

const SubBalanceItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* O'rtaga joylash */
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
  color: #757575;
  flex-grow: 1; /* Tugmalar bo'sh joyni qoplamasligi uchun o'rtadagi itemlar cho'ziladi */
`;

const Divider = styled.div`
  width: 1px;
  background-color: #e0e0e0;
`;

const Amount = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #4caf50;
`;
const Button = styled.button`
  background-color: ${({ color }) => color};
  border: none;
  border-radius: 8px; /* Burchaklarni biroz dumaloq qilish */
  font-size: 24px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1; /* Bo'sh joyni qoplash */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
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
      <Button onClick={toggleDrawer2} color="#f44336">
        <MinusOutlined />
      </Button>{" "}
      <MainMiddle>
        <TotalBalance>Umumiy hisob: UZS {balance?.all?.uzs}</TotalBalance>
        <SubBalances>
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
        </SubBalances>
      </MainMiddle>
      <Button onClick={toggleDrawer} color="#4caf50">
        +
      </Button>
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
