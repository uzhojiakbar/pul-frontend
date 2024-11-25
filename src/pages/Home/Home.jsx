import React from "react";
import styled from "styled-components";
import TransactionsList from "../../components/TransactionsList/TransacrionsList";
import ActionButtons from "../../components/ActionButtons/ActionButtons";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #f0f2f5;
`;

const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  padding-bottom: 80px;
`;

const AppWrapper = styled.div`
  height: 100%;
  width: 100%;
  min-width: 320px;
  margin: 0 auto;
  position: relative;
  background-color: #f5f5f5;
`;

const Home = ({ transactions }) => {
  return (
    <HomeWrapper>
      <AppWrapper>
        {/* Content */}
        <ContentWrapper>
          <TransactionsList transactions={transactions} />
        </ContentWrapper>
      </AppWrapper>
    </HomeWrapper>
  );
};

export default Home;
