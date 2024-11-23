import React from "react";
import styled from "styled-components";
import { Collapse, Empty } from "antd";
import {
  CreditCardOutlined,
  WalletOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import BalanceCard from "../BalanceCard/BalanceCard";

const { Panel } = Collapse;

const ListWrapper = styled.div`
  margin: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  height: fit-content;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 2px solid #c5c2c2;

  &:last-child {
    border-bottom: none;
  }

  .amount-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: bold;
    color: ${({ type }) => (type === "expense" ? "#f44336" : "#4caf50")};
  }

  span {
    font-size: 14px;
  }
`;

const IndicatorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Indicator = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${({ type }) =>
    type === "expense" ? "#f44336" : "#4caf50"};
  border-radius: 50%;
  box-shadow: 0 0 5px 2px
    ${({ type }) => (type === "expense" ? "#f44336" : "#4caf50")};
`;

const TransactionDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .title {
    font-size: 15px;
    font-weight: 600;
    text-transform: capitalize;
  }

  p {
    margin: 0;
    font-size: 14px;
  }
`;

const DateSummary = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
`;

const NoDataWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px;
  text-align: center;
  background-color: #fafafa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NoDataText = styled.h3`
  color: #8c8c8c;
  font-weight: 500;
`;

const BalanceCardWrapper = styled.div`
  display: block;
  position: sticky;
  backdrop-filter: blur(2px);
  z-index: 1;
  top: 10vh;
  @media (max-width: 1024px) {
    display: none; /* Kompyuter versiyada yashirish */
  }
`;

const TransactionsList = ({ transactions }) => {
  const formatDate = (date) =>
    moment(date, "YYYY-MM-DD").format("DD-MMMM YYYY");

  const renderTransactionItems = (items) =>
    items.reverse().map((item, index) => {
      let Icon;
      let iconColor = item.type === "income" ? "#4caf50" : "#f44336";

      if (item.payment === "KARTA") {
        Icon = (
          <CreditCardOutlined style={{ color: iconColor, fontSize: "16px" }} />
        );
      } else if (item.payment === "USD") {
        Icon = (
          <DollarCircleOutlined
            style={{ color: iconColor, fontSize: "16px" }}
          />
        );
      } else {
        Icon = (
          <WalletOutlined style={{ color: iconColor, fontSize: "16px" }} />
        );
      }

      return (
        <TransactionItem key={index} type={item.type}>
          <TransactionDetails>
            <IndicatorWrapper>
              <Indicator type={item.type} />
              <div>
                <p className="title">{item.category}</p>
                <p>{item.description}</p>
              </div>
            </IndicatorWrapper>
          </TransactionDetails>
          <div className="amount-wrapper">
            {Icon}
            <span>{item.amount.toLocaleString()} UZS</span>
          </div>
        </TransactionItem>
      );
    });

  // Tranzaktsiyalarni guruhlash
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const date = transaction.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {});

  // Sanalarni kamayish tartibida tartiblash
  const sortedDates = Object.keys(groupedTransactions).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <>
      <BalanceCardWrapper>
        <BalanceCard naqd={200000} karta={500000} dollar={1900000} />
      </BalanceCardWrapper>

      {transactions.length === 0 ? ( // Agar tranzaktsiyalar bo‘sh bo‘lsa
        <NoDataWrapper>
          <Empty description={false} />
          <NoDataText>Hozircha malumotlar mavjud emas</NoDataText>
        </NoDataWrapper>
      ) : (
        <ListWrapper>
          <Collapse>
            {sortedDates.map((date) => {
              const dayTransactions = groupedTransactions[date];
              const total = dayTransactions.reduce((sum, item) => {
                return item.type === "income"
                  ? sum + item.amount
                  : sum - item.amount;
              }, 0);

              return (
                <Panel
                  key={date}
                  header={
                    <DateSummary>
                      <span>{formatDate(date)}</span>
                      <span
                        style={{
                          color: total >= 0 ? "#4caf50" : "#f44336",
                        }}
                      >
                        UZS {total.toLocaleString()}
                      </span>
                    </DateSummary>
                  }
                >
                  {renderTransactionItems(dayTransactions)}
                </Panel>
              );
            })}
          </Collapse>
        </ListWrapper>
      )}
    </>
  );
};

export default TransactionsList;
