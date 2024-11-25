import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FilterOutlined,
  MenuOutlined,
  MinusOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useBalance } from "../../hook/useBalance";
import Loading from "../Loading/Loading";
import { Select } from "antd";

const { Option } = Select;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  transition: all 0.3s ease-in-out;
  width: ${({ width }) => width || "100%"};

  ${({ sticky }) =>
    sticky &&
    `
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 8px 16px;
    border-radius: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
  `}

  @media (max-width: 768px) {
    ${({ sticky }) =>
      sticky &&
      `
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 8px 16px;
    border-radius: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  `}
  }
`;

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Button = styled.button`
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
  border-radius: 8px;
  padding: ${({ sticky }) => (sticky ? "12px 4px" : "28px 8px")};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ sticky }) => (sticky ? "4px" : "8px")};
  font-size: ${({ sticky }) => (sticky ? "14px" : "16px")};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  outline: none;
  border: none;

  &:hover {
    background: rgba(76, 175, 80, 0.4);
    color: white;
  }

  & svg {
    font-size: ${({ sticky }) => (sticky ? "16px" : "20px")};
    transition: font-size 0.3s ease;
  }
`;

const BalanceSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  margin-bottom: ${({ sticky }) => (sticky ? "0" : "16px")};

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
  font-size: ${({ sticky }) => (sticky ? "24px" : "32px")};
  font-weight: bold;
  color: #4caf50;
  margin-top: 4px;
  @media (max-width: 480px) {
    font-size: 22px;
  }
  transition: font-size 0.3s ease;
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

const BalanceCard = ({ width = "100%", setOpenPage, OpenPage }) => {
  const { data: balance, isLoading, refetch } = useBalance();
  const [isSticky, setIsSticky] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("UZS");

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const changePage = (page) => {
    if (page === OpenPage) {
      setOpenPage("");
    } else {
      setOpenPage(page);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const displayedBalance =
    selectedCurrency === "USD"
      ? balance?.all?.usd?.toLocaleString() || "0,00"
      : balance?.all?.uzs?.toLocaleString() || "0,00";

  return (
    <Card width={width} sticky={isSticky}>
      {isLoading && <Loading />}
      <BalanceSection sticky={isSticky}>
        <BalanceTitle sticky={isSticky}>Umumiy hisobingiz</BalanceTitle>
        <div className="mainCard">
          <RefreshButton sticky={isSticky} onClick={refetch}>
            <ReloadOutlined />
          </RefreshButton>
          <BalanceValue sticky={isSticky}>{displayedBalance}</BalanceValue>
          <Select
            value={selectedCurrency}
            onChange={(value) => setSelectedCurrency(value)}
          >
            <Option value="UZS">UZS</Option>
            <Option value="USD">USD</Option>
          </Select>
        </div>
      </BalanceSection>
      <ButtonsContainer sticky={isSticky}>
        <Button sticky={isSticky} onClick={() => changePage("income")}>
          <PlusOutlined />
          Income
        </Button>
        <Button sticky={isSticky} onClick={() => changePage("expense")}>
          <MinusOutlined />
          Expense
        </Button>
        <Button sticky={isSticky} onClick={() => changePage("filter")}>
          <FilterOutlined />
          Filter
        </Button>
        <Button sticky={isSticky} onClick={() => changePage("category")}>
          <MenuOutlined />
          Kategoriya
        </Button>
      </ButtonsContainer>
    </Card>
  );
};

export default BalanceCard;
