import React from "react";
import styled from "styled-components";
import Header from "../../components/Header/Header";
import BalanceCard from "../../components/BalanceCard/BalanceCard";
import TransactionsList from "../../components/TransactionsList/TransacrionsList";
import ActionButtons from "../../components/ActionButtons/ActionButtons";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
`;

const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  padding-bottom: 80px; /* ActionButtons balandligiga mos */
`;

const AppWrapper = styled.div`
  height: 100%;
  width: 100%;
  min-width: 320px; /* Maksimal kenglik (mobil uchun) */
  margin: 0 auto;
  position: relative;
  background-color: #f5f5f5;
`;

const Home = () => {
  const transactions = [
    {
      date: "21.11.2024",
      category: "Deposits",
      amount: 60000000,
      type: "income",
    },
    {
      date: "21.11.2024",
      category: "Deposits (Oylik)",
      amount: 1000000,
      type: "income",
    },
    { date: "21.11.2024", category: "Health", amount: 500000, type: "expense" },
    {
      date: "21.11.2024",
      category: "Food (Cola)",
      amount: 9000,
      type: "expense",
    },
    {
      date: "20.11.2024",
      category: "Entertainment",
      amount: 500000,
      type: "expense",
    },
    {
      date: "20.11.2024",
      category: "Groceries",
      amount: 200000,
      type: "expense",
    },
    { date: "19.11.2024", category: "Salary", amount: 1500000, type: "income" },
  ];

  return (
    <HomeWrapper>
      <AppWrapper>
        <Header />
        <ContentWrapper>
          <TransactionsList transactions={transactions} />
        </ContentWrapper>
        <ActionButtons />
      </AppWrapper>
    </HomeWrapper>
  );
};

export default Home;
