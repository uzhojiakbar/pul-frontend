import React from "react";
import styled from "styled-components";
import {
  WalletOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";

import { useBalance } from "../../hook/useBalance";

const Card = styled.div`
  margin: 0 16px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-height: 15vh; /* Maximal balandlik */
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

const BalanceCard = ({ naqd, karta, dollar }) => {
  const { data: balance, isLoading } = useBalance();
  console.log(balance);

  const totalBalance = naqd + karta + dollar;

  return (
    <Card>
      <TotalBalance>Umumiy hisob: UZS {balance?.all?.uzs}</TotalBalance>
      <SubBalances>
        <SubBalanceItem>
          <WalletOutlined style={{ fontSize: "16px", color: "#4caf50" }} />
          <Amount>{balance?.uzs.toLocaleString()} UZS </Amount>
        </SubBalanceItem>
        <Divider />
        <SubBalanceItem>
          <CreditCardOutlined style={{ fontSize: "16px", color: "#4caf50" }} />
          <Amount>{balance?.card} UZS </Amount>
        </SubBalanceItem>
        <Divider />
        <SubBalanceItem>
          <DollarCircleOutlined
            style={{ fontSize: "16px", color: "#4caf50" }}
          />
          <Amount> {balance?.usd.toLocaleString()} USD</Amount>
        </SubBalanceItem>
      </SubBalances>
    </Card>
  );
};

export default BalanceCard;
