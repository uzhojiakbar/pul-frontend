import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TransactionsList from "../../components/TransactionsList/TransacrionsList";
import ActionButtons from "../../components/ActionButtons/ActionButtons";
import BalanceCard from "../../components/BalanceCard/BalanceCard";
import NewIncome from "../NewIncome/NewIncome";
import Sidebar from "../../components/Sidebar/Sidebar";
import NewExpense from "../NewExpense/NewIncome";
import FilterModal from "../../components/FilterModal/FilterModal";
import CategoryPage from "../Category/CategoryPage";

const HomeWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  transition: all 0.3s ease-in-out;
  background: white;
`;

const ContentWrapper = styled.div`
  flex: 1;
  width: ${({ width }) => width || "100%"};
  transition: all 0.3s ease-in-out;
`;

const AppWrapper = styled.div`
  height: 100%;
  min-width: 320px;
  position: relative;
  background-color: #f5f5f5;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  padding-right: 20px; /* Optional: Adds some space on the right if you want to separate the LeftPageWrapper */
  width: ${({ width }) => width || "100%"};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LeftPageWrapper = styled.div`
  width: 30%;
  position: sticky;
  top: 20px; /* Adjust depending on how far from the top you want it */
  transition: all 0.3s ease;
  margin-left: 20px; /* This creates the space between AppWrapper and LeftPageWrapper */
  background: white;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarWithBalance = styled(Sidebar)`
  display: none !important;

  @media (max-width: 768px) {
    display: flex !important;
  }
`;

const Home = ({}) => {
  const [OpenPage, setOpenPage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check if the screen size is mobile or desktop

  // Update the screen size state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const SidebarToggle = () => {
    setOpenPage(false);
  };

  return (
    <HomeWrapper>
      <AppWrapper
        width={OpenPage === "filter" ? "100%" : OpenPage ? "70%" : "100%"}
      >
        <BalanceCard setOpenPage={setOpenPage} OpenPage={OpenPage} />
        <ContentWrapper>
          <TransactionsList />
        </ContentWrapper>
      </AppWrapper>

      {OpenPage === "income" && (
        <LeftPageWrapper>
          <NewIncome />
        </LeftPageWrapper>
      )}

      {OpenPage === "expense" && (
        <LeftPageWrapper>
          <NewExpense />
        </LeftPageWrapper>
      )}

      {OpenPage === "filter" && (
        <FilterModal isOpen={OpenPage === "filter"} onClose={SidebarToggle} />
      )}
      {OpenPage === "category" && (
        <LeftPageWrapper>
          <CategoryPage />
        </LeftPageWrapper>
      )}

      {/* Only show Sidebar on mobile */}
      {isMobile && (
        <SidebarWithBalance
          title="Income qo'shish"
          isOpen={OpenPage === "income"}
          onClose={SidebarToggle}
          direction="left"
        >
          <NewIncome
            loading={loading}
            setLoading={setLoading}
            close={SidebarToggle}
          />
        </SidebarWithBalance>
      )}

      {isMobile && (
        <SidebarWithBalance
          title="Income qo'shish"
          isOpen={OpenPage === "expense"}
          onClose={SidebarToggle}
        >
          <NewExpense
            loading={loading}
            setLoading={setLoading}
            close={SidebarToggle}
          />
        </SidebarWithBalance>
      )}
      {isMobile && (
        <FilterModal isOpen={OpenPage === "filter"} onClose={SidebarToggle} />
      )}

      {isMobile && (
        <SidebarWithBalance
          title="Income qo'shish"
          isOpen={OpenPage === "category"}
          onClose={SidebarToggle}
        >
          <CategoryPage />
        </SidebarWithBalance>
      )}
      {/* Sidebar for Desktop (hidden on mobile) */}
      {/* You can keep a different Sidebar for desktop if you want */}
      {/* <Sidebar
        direction="left"
        title="Expense qo'shish"
        isOpen={isSidebarOpenExpense}
        onClose={toggleExpenseSidebar}
      >
        <NewExpense
          loading={loading}
          setLoading={setLoading}
          close={toggleExpenseSidebar}
        />
      </Sidebar> */}
    </HomeWrapper>
  );
};

export default Home;
