import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header/Header";
import TransactionsList from "../../components/TransactionsList/TransacrionsList";
import ActionButtons from "../../components/ActionButtons/ActionButtons";
import FilterModal from "../../components/FilterModal/FilterModal";

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

const Home = () => {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState(null);

  return (
    <HomeWrapper>
      <AppWrapper>
        {/* Content */}
        <ContentWrapper>
          <TransactionsList />
        </ContentWrapper>

        {/* Action Buttons */}
        <ActionButtons />
      </AppWrapper>
    </HomeWrapper>
  );
};

export default Home;
