import React, { useState } from "react";
import styled from "styled-components";
import {
  FilterOutlined,
  MenuFoldOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import BalanceCard from "../BalanceCard/BalanceCard";
import Sidebar from "../Sidebar/Sidebar.jsx"; // Sidebar Component
import { NavLink } from "react-router-dom";
import { useBalance } from "../../hook/useBalance";
import CategoryPage from "../../pages/Category/CategoryPage.jsx";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

const TitleWrapper = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;
  user-select: none;
  text-decoration: none;

  font-weight: 900;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Logo = styled(DollarCircleOutlined)`
  font-size: 24px;
  color: #4caf50;
`;

const Title = styled.h1`
  font-size: 18px;
  color: #4caf50;
  margin: 0;
`;

const IconsWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 5px;

  outline: none;

  * {
    outline: none;
  }
`;

const MainWrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  backdrop-filter: blur(4px);
  z-index: 2;

  width: 100%;

  padding: 5px 0;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: 1024px) {
    .balance {
      display: none;
    }
  }
`;

const Header = ({ setFilterModalOpen }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleDrawer = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <MainWrapper>
      <HeaderWrapper>
        {/* Left Side */}
        <TitleWrapper to={"/"}>
          <Logo />
          <Title>SOQQA</Title>
        </TitleWrapper>

        {/* Right Side */}
        <IconsWrapper>
          <FilterOutlined
            onClick={() => setFilterModalOpen(true)}
            style={{ fontSize: "20px", color: "#4caf50", cursor: "pointer" }}
          />
          <MenuFoldOutlined
            onClick={() => setSidebarOpen(true)}
            style={{ fontSize: "20px", color: "#4caf50", cursor: "pointer" }}
          />
        </IconsWrapper>
      </HeaderWrapper>

      <div className="balance">
        <BalanceCard />
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleDrawer}>
        <CategoryPage />
      </Sidebar>
    </MainWrapper>
  );
};

export default Header;
