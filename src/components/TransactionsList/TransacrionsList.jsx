import React, { useState } from "react";
import styled from "styled-components";
import { Collapse, Empty } from "antd";
import moment from "moment";
import Loading from "../Loading/Loading";
import { useTransactions } from "../../hook/useTransactions";
import FilterModal from "../FilterModal/FilterModal"; // Modal komponentini import qilish
import Header from "../Header/Header";

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
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  span {
    font-size: 14px;
    color: ${({ type }) => (type === "expense" ? "#f44336" : "#4caf50")};
  }
`;

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ type }) =>
    type === "expense" ? "#f44336" : "#4caf50"};
  border-radius: 50%;
  margin-right: 8px;
`;

const TransactionDetails = styled.div`
  display: flex;
  align-items: center;

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

const TransactionsList = ({ transactions }) => {
  const formatDate = (date) =>
    moment(date, "YYYY-MM-DD").format("DD-MMMM YYYY");

  const renderTransactionItems = (items) =>
    items.map((item, index) => (
      <TransactionItem key={index} type={item.type}>
        <TransactionDetails>
          <Indicator type={item.type} />
          <p>{item.category}</p>
        </TransactionDetails>
        <span>UZS {item.amount.toLocaleString()}</span>
      </TransactionItem>
    ));

  // Tranzaktsiyalarni guruhlash
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const date = transaction.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {});

  return (
    <>
      {transactions.length === 0 ? ( // Agar tranzaktsiyalar bo‘sh bo‘lsa
        <NoDataWrapper>
          <Empty description={false} />
          <NoDataText>Hozircha malumotlar mavjud emas</NoDataText>
        </NoDataWrapper>
      ) : (
        <ListWrapper>
          <Collapse accordion>
            {Object.keys(groupedTransactions).map((date) => {
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
