import React from "react";
import styled from "styled-components";
import {
  FilterOutlined,
  MenuFoldOutlined,
  DollarCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons"; // Ant Design'dan kerakli ikonlar
import { Dropdown, Menu } from "antd";
import BalanceCard from "../BalanceCard/BalanceCard";
import { NavLink } from "react-router-dom";
import { useBalance } from "../../hook/useBalance";

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

const BalanceDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #4caf50;
  cursor: pointer;

  border: 1px solid #4caf50;
  padding: 5px 10px;
  border-radius: 5px;

  transition: 0.3s;

  &:hover {
    background-color: #4caf50;
    color: white;
  }

  @media (max-width: 1024px) {
    display: none; /* Kompyuter versiyada yashirish */
  }
`;
const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Header = ({ setFilterModalOpen }) => {
  const { data: balance, isLoading } = useBalance();

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span>Naqd:</span>{" "}
        <span style={{ float: "right" }}> {balance?.uzs} UZS</span>
      </Menu.Item>
      <Menu.Item key="2">
        <span>Karta:</span>{" "}
        <span style={{ float: "right" }}> {balance?.card} UZS</span>
      </Menu.Item>
      <Menu.Item key="3">
        <span>Dollar:</span>{" "}
        <span style={{ float: "right" }}> {balance?.usd} USD</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <MainWrapper>
      <HeaderWrapper>
        {/* Left Side: Dollar Icon with Title */}
        <LeftWrapper>
          <TitleWrapper to={"/"}>
            <Logo />
            <Title>SOQQA</Title>
          </TitleWrapper>

          <Dropdown overlay={menu} trigger={["hover"]}>
            <BalanceDisplay>Umumiy: {balance?.all?.uzs} UZS </BalanceDisplay>
          </Dropdown>
        </LeftWrapper>
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
