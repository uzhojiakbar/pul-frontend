import React, { useState } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import {
  PlusOutlined,
  MinusOutlined,
  FilterOutlined,
  UnorderedListOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useBalance } from "../../hook/useBalance";
import { Select } from "antd";
import Loading from "../Loading/Loading";

const { Option } = Select;

const MotionContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(2px);
  color: #333;
  border-radius: 12px;
  min-width: 320px;
  max-width: 1920px;
  width: ${({ width }) => width || "100%"};
  text-align: center;
  padding: 16px;
  position: fixed;
  top: ${({ isScrolled }) => (isScrolled ? "0" : "9vh")};
  z-index: 999;
  display: flex;
  flex-direction: ${({ isScrolled }) => (isScrolled ? "row" : "column")};
  justify-content: ${({ isScrolled }) =>
    isScrolled ? "space-between" : "center"};
  align-items: center;
  gap: ${({ isScrolled }) => (isScrolled ? "10px" : "20px")};
  height: ${({ isScrolled }) => (isScrolled ? "10vh" : "30vh")};
  transition: all 0.3s ease-in-out;

  @media (max-width: 1024px) {
    width: 100vw;
    height: 25vh;
    flex-direction: column;
    gap: 10px;
  }
`;

const BalanceSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  margin-bottom: ${({ isScrolled }) => (isScrolled ? "0" : "16px")};

  .mainCard {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
`;

const BalanceTitle = styled.div`
  font-size: 16px;
  color: #666;
`;

const BalanceValue = styled.div`
  font-size: ${({ isScrolled }) => (isScrolled ? "24px" : "32px")};
  font-weight: bold;
  color: #4caf50;
  margin-top: 4px;
  @media (max-width: 480px) {
    font-size: 22px;
  }
  transition: font-size 0.3s ease-in-out;
`;

const RefreshButton = styled.button`
  background: none;
  border: 1px solid #4caf50;
  color: #4caf50;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #4caf50;
    color: white;
  }
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 16px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ActionButton = styled.div`
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
  border-radius: 8px;
  padding: ${({ isScrolled }) => (isScrolled ? "12px 4px" : "28px 8px")};
  display: flex;
  flex-direction: ${({ isScrolled }) => (isScrolled ? "row" : "column")};
  align-items: center;
  justify-content: center;
  gap: ${({ isScrolled }) => (isScrolled ? "4px" : "8px")};
  font-size: ${({ isScrolled }) => (isScrolled ? "14px" : "16px")};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    background: rgba(76, 175, 80, 0.4);
    color: white;
  }

  & svg {
    font-size: ${({ isScrolled }) => (isScrolled ? "16px" : "20px")};
    transition: font-size 0.3s ease-in-out;
  }
`;

// Main Component
const BalanceCard = ({
  width = "100vw",
  setCurrentPage,
  currentPage,
  isScrolled,
}) => {
  const { data: balance, isLoading, refetch } = useBalance();
  const [selectedCurrency, setSelectedCurrency] = useState("UZS");

  // UseInView for checking if component is in view
  const { ref, inView } = useInView({
    threshold: 0.08, // 8vh equivalent threshold
    triggerOnce: false,
  });

  const changePage = (page) => {
    if (page === currentPage) {
      setCurrentPage(false);
    } else {
      setCurrentPage(page);
    }
  };

  const displayedBalance =
    selectedCurrency === "USD"
      ? `${balance?.all?.usd?.toLocaleString()}`
      : `${balance?.all?.uzs?.toLocaleString()}`;

  if (isLoading) return <Loading />;

  return (
    <MotionContainer
      ref={ref}
      isScrolled={isScrolled}
      width={width}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
    >
      <BalanceSection isScrolled={isScrolled}>
        <BalanceTitle>Umumiy hisobingiz</BalanceTitle>
        <div className="mainCard">
          <RefreshButton onClick={refetch}>
            <ReloadOutlined />
          </RefreshButton>
          <BalanceValue isScrolled={isScrolled}>
            {displayedBalance || "0,00"}
          </BalanceValue>
          <Select
            value={selectedCurrency}
            onChange={(value) => setSelectedCurrency(value)}
          >
            <Option value="UZS">UZS</Option>
            <Option value="USD">USD</Option>
          </Select>
        </div>
      </BalanceSection>
      <ButtonGroup>
        <ActionButton
          onClick={() => changePage("income")}
          isScrolled={isScrolled}
        >
          <PlusOutlined />
          {isScrolled ? "Kirim" : "To'ldirish"}
        </ActionButton>
        <ActionButton isScrolled={isScrolled}>
          <MinusOutlined />
          {isScrolled ? "Chiqim" : "Chiqim qo'shish"}
        </ActionButton>
        <ActionButton isScrolled={isScrolled}>
          <FilterOutlined />
          {isScrolled ? "Filtr" : "Filtrlash"}
        </ActionButton>
        <ActionButton isScrolled={isScrolled}>
          <UnorderedListOutlined />
          {isScrolled ? "Kategoriya" : "Kategoriyalar"}
        </ActionButton>
      </ButtonGroup>
    </MotionContainer>
  );
};

export default BalanceCard;
