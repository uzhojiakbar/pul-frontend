import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import TransactionsList from "../../components/TransactionsList/TransacrionsList";
import BalanceCard from "../../components/BalanceCard/BalanceCard";
import NewIncome from "../NewIncome/NewIncome";
import { useInView } from "react-intersection-observer";

// Animatsiya uchun keyframes
const slideIn = keyframes`
  from {
    right: -30%;
  }
  to {
    right: 0;

  }
`;

const HomeWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  transition: all 0.2s;
  background-color: white;
`;

const ContentWrapper = styled.div`
  width: 100%;
  transition: all 0.2s;
  margin: 10px 0;
  padding-top: ${({ isScrolled }) => (isScrolled ? "11vh" : "30vh")};

  @media (max-width: 1024px) {
    padding-top: 35vh;
  }
`;

const AppWrapper = styled.div`
  height: 100%;
  width: ${({ width }) => width};
  position: relative;
  background-color: #f5f5f5;
  transition: all 0.2s;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const PageCon = styled.div`
  position: sticky;
  top: 8vh;
  margin: 0;
  padding: 0;
  background-color: white;
  margin: 20px;
  height: 90vh;

  animation: ${({ isVisible }) => (isVisible ? slideIn : "none")} 1s ease-out;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Home = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const { ref, inView } = useInView({
    threshold: 1, // 20% qismi ko'rinsa holat tetiklanadi
    triggerOnce: false,
  });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const viewportHeight = window.innerHeight;

          // Agar scroll 8vh dan katta bo'lsa
          setIsScrolled(scrollY > 0.07 * viewportHeight);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      setTimeout(() => {
        window.removeEventListener("scroll", handleScroll);
      }, 3000);
    };
  }, []);

  return (
    <HomeWrapper>
      <AppWrapper width={`${currentPage ? "70vw" : "100vw"}`}>
        <BalanceCard
          ref={ref}
          inView={inView}
          width={`${currentPage ? "70vw" : "100vw"}`}
          isScrolled={isScrolled}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ContentWrapper isScrolled={isScrolled}>
          <TransactionsList transactions={transactions} />
        </ContentWrapper>
      </AppWrapper>

      {currentPage === "income" && (
        <PageCon isVisible={currentPage === "income"}>
          <NewIncome />
        </PageCon>
      )}
    </HomeWrapper>
  );
};

export default Home;
