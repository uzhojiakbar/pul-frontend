import React from "react";
import styled from "styled-components";

const Card = styled.div`
  margin: 16px;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const BalanceText = styled.h2`
  font-size: 24px;
  color: #4caf50;
`;

const BalanceCard = ({ balance }) => {
  return (
    <Card>
      <p>Balance</p>
      <BalanceText>UZS {balance}</BalanceText>
    </Card>
  );
};

export default BalanceCard;
