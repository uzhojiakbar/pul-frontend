import React from "react";
import styled from "styled-components";
import {
  FilterOutlined,
  MenuFoldOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons"; // Ant Design'dan kerakli ikonlar
import BalanceCard from "../BalanceCard/BalanceCard";
import { NavLink } from "react-router-dom";

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
`;

const Logo = styled(DollarCircleOutlined)`
  font-size: 24px;
  color: #4caf50; /* Yashil rang */
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

  height: fit-content;
  max-height: 10vh;

  @media (max-width: 1024px) {
    height: fit-content;
    max-height: 26vh;
  }
`;

const BalanceWrapper = styled.div`
  margin-top: 10px;

  @media (min-width: 1024px) {
    display: none; /* Kompyuter versiyada yashirish */
  }
`;

const Header = ({ setFilterModalOpen }) => {
  return (
    <MainWrapper>
      <HeaderWrapper>
        {/* Left Side: Dollar Icon with Title */}
        <TitleWrapper to={"/"}>
          <Logo />
          <Title>SOQQA</Title>
        </TitleWrapper>

        {/* Right Side: Filter Icon */}
        <IconsWrapper>
          <FilterOutlined
            onClick={() => setFilterModalOpen(true)}
            style={{ fontSize: "20px", color: "#4caf50", cursor: "pointer" }}
          />
          <NavLink to="/categories">
            <MenuFoldOutlined
              style={{ fontSize: "20px", color: "#4caf50", cursor: "pointer" }}
            />
          </NavLink>
        </IconsWrapper>
      </HeaderWrapper>

      {/* Balance Card */}
      <BalanceWrapper>
        <BalanceCard naqd={200000} karta={500000} dollar={1900000} />
      </BalanceWrapper>
    </MainWrapper>
  );
};

export default Header;
