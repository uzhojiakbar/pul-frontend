import React, { useEffect, useState } from "react";
import Router from "../router/router";
import "./root.css";
import { isTokenExpired, logoutUser } from "../utils/auth";
import Cookies from "js-cookie";
import GlobalStyle from "./style";
import Header from "../components/Header/Header";
import FilterModal from "../components/FilterModal/FilterModal";
import { useTransactions } from "../hook/useTransactions";
import Loading from "../components/Loading/Loading";

const Root = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true); // Token yaroqli bo‘lsa
    } else {
      logoutUser(); // Token yaroqsiz bo‘lsa
      setIsAuthenticated(false);
    }
    setIsLoading(false); // Tekshiruv tugadi
  }, []);

  const [FilterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({}); // Filterlar holati

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

  const { data: transactions = [], isLoading: transactionsLoading } =
    useTransactions(filters);

  if (isLoading) {
    return <Loading />; // Autentifikatsiya tekshiruvi davomida Loading ko‘rsatamiz
  }

  return isAuthenticated ? (
    <div className="main">
      {transactionsLoading && <Loading />}
      <GlobalStyle />
      <Header setFilterModalOpen={setFilterModalOpen} />

      <FilterModal
        isOpen={FilterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={handleApplyFilters}
      />

      <Router transactions={transactions} />
    </div>
  ) : (
    <div>
      <GlobalStyle />
      <Router />
    </div>
  );
};

export default Root;
