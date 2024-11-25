import React, { useState, useCallback } from "react";
import styled from "styled-components";
import {
  FilterOutlined,
  MenuFoldOutlined,
  DollarCircleOutlined,
  MenuOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import Sidebar from "../Sidebar/Sidebar.jsx"; // Sidebar Component
import { NavLink } from "react-router-dom";
import CategoryPage from "../../pages/Category/CategoryPage.jsx";
import { logoutUser } from "../../utils/auth.js";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
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
  font-size: 28px;
  color: #4caf50;
`;

const Title = styled.h1`
  font-size: 20px;
  color: #4caf50;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .icon-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    color: #4caf50;
    cursor: pointer;

    &:hover {
      color: #388e3c;
    }
  }

  @media (max-width: 768px) {
    display: none; /* Mobilda faqat Dropdown ko'rinadi */
  }
`;

const MobileDropdown = styled(Dropdown)`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const SidebarMenu = styled(MenuOutlined)`
  font-size: 24px;
  color: #4caf50;
  cursor: pointer;

  &:hover {
    color: #388e3c;
  }
`;

const MainWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);

  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 16px 0;

  min-width: 320px;
  width: 100vw;
  max-width: 1920px;
  margin: 0 auto;

  .balance {
    /* display: none; */

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const Header = ({ setFilterModalOpen }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Using useCallback to memoize functions and prevent unnecessary re-renders
  const toggleDrawer = useCallback(() => {
    setSidebarOpen((prevState) => !prevState);
  }, []);

  const logoutUserFunc = useCallback(() => {
    document.location.reload();
    logoutUser();
  }, []);

  const mobileMenu = (
    <Menu
      style={{
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
        backgroundColor: "#f9f9f9",
        padding: "8px",
      }}
    >
      <Menu.Item
        key="filter"
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #e0e0e0",
          fontWeight: "bold",
          color: "#4caf50",
          cursor: "pointer",
        }}
        onClick={() => setFilterModalOpen(true)}
      >
        <FilterOutlined style={{ marginRight: "8px", color: "#4caf50" }} />
        Filtrlar
      </Menu.Item>
      <Menu.Item
        key="menu"
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #e0e0e0",
          fontWeight: "bold",
          color: "#4caf50",
          cursor: "pointer",
        }}
        onClick={toggleDrawer}
      >
        <MenuFoldOutlined style={{ marginRight: "8px", color: "#4caf50" }} />
        Kategoriyalar
      </Menu.Item>
      <Menu.Item
        key="logout"
        style={{
          padding: "12px 16px",
          fontWeight: "bold",
          color: "#f44336",
          cursor: "pointer",
        }}
        onClick={logoutUserFunc}
      >
        <LogoutOutlined style={{ marginRight: "8px", color: "#f44336" }} />
        Chiqish
      </Menu.Item>
    </Menu>
  );

  return (
    <MainWrapper>
      <HeaderWrapper>
        {/* Left Side */}
        <TitleWrapper to="/">
          <Logo />
          <Title>WEALTHY</Title>
        </TitleWrapper>

        {/* Right Side - Desktop */}
        <IconsWrapper>
          <div
            className="icon-wrapper"
            onClick={() => setFilterModalOpen(true)}
          >
            <FilterOutlined />
            <span>Filtrlar</span>
          </div>
          <div className="icon-wrapper" onClick={toggleDrawer}>
            <MenuFoldOutlined /> <span>Kategoriyalar</span>
          </div>
          <div className="icon-wrapper" onClick={logoutUserFunc}>
            <LogoutOutlined
              style={{
                fontSize: "20px",
                color: "#f44336",
                cursor: "pointer",
              }}
              title="Chiqish"
            />
            <span
              style={{
                color: "#f44336",
                cursor: "pointer",
              }}
            >
              Chiqish
            </span>
          </div>
        </IconsWrapper>

        {/* Right Side - Mobile */}
        <MobileDropdown overlay={mobileMenu} trigger={["click"]}>
          <SidebarMenu />
        </MobileDropdown>
      </HeaderWrapper>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleDrawer}>
        <CategoryPage />
      </Sidebar>
    </MainWrapper>
  );
};

export default Header;
