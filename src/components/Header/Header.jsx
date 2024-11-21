import React from "react";
import styled from "styled-components";
import { FilterOutlined, MoneyCollectOutlined } from "@ant-design/icons"; // Ant Design'dan kerakli ikonlar
import BalanceCard from "../BalanceCard/BalanceCard";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Logo = styled(MoneyCollectOutlined)`
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
`;

const MainWrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  backdrop-filter: blur(4px);
  z-index: 2;

  width: 100%;
  height: fit-content;
  padding: 5px 0;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
`;

const Header = () => {
  return (
    <MainWrapper>
      <HeaderWrapper>
        {/* Left Side: Dollar Icon with Title */}
        <TitleWrapper>
          <Logo />
          <Title>SOQQA</Title>
        </TitleWrapper>

        {/* Right Side: Filter Icon */}
        <IconsWrapper>
          <FilterOutlined style={{ fontSize: "20px", color: "#4caf50" }} />
        </IconsWrapper>
      </HeaderWrapper>

      {/* Balance Card */}
      <BalanceCard balance="59,991,000.00" />
    </MainWrapper>
  );
};

export default Header;
