import React, { useEffect, useState, useMemo } from "react";
import Router from "../router/router";
import "./root.css";
import { isTokenExpired, logoutUser } from "../utils/auth";
import Cookies from "js-cookie";
import GlobalStyle from "./style";
import Header from "../components/Header/Header";
import FilterModal from "../components/FilterModal/FilterModal";
import { useTransactions } from "../hook/useTransactions";
import Loading from "../components/Loading/Loading";
import styled from "styled-components";

// Styled Componentsni alohida faylga ajratish tavsiya qilinadi
const MainNWrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
`;

const Root = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [FilterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({});

  // useMemo orqali filterlarni optimallashtirish
  const memoizedFilters = useMemo(() => filters, [filters]);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true); // Token yaroqli bo‘lsa
    } else {
      logoutUser(); // Token yaroqsiz bo‘lsa
      setIsAuthenticated(false);
    }
  }, []);

  const handleApplyFilters = (newFilters) => {
    setFilters({
      ...filters,
      type: newFilters.filterType,
      payment: newFilters.paymentType,
      startDate: newFilters.dateRange ? newFilters.dateRange[0] : null,
      endDate: newFilters.dateRange ? newFilters.dateRange[1] : null,
    });
    setFilterModalOpen(false);
  };

  // useTransactions optimallashtirilgan
  const {
    data: transactions = [],
    isLoading: transactionsLoading,
    error,
  } = useTransactions(memoizedFilters);

  // if (isLoading || transactionsLoading) {
  //   return <Loading />; // Autentifikatsiya yoki ma'lumotlar yuklanmoqda
  // }

  // Error handling (optional)

  return isAuthenticated ? (
    <MainNWrapper className="main">
      <GlobalStyle />
      <Header setFilterModalOpen={setFilterModalOpen} />
      <FilterModal
        isOpen={FilterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={handleApplyFilters}
      />
      <Router transactions={transactions} />
    </MainNWrapper>
  ) : (
    <MainNWrapper className="main">
      <GlobalStyle />
      <Router />
    </MainNWrapper>
  );
};

export default Root;
