import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { logoutUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
`;

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <HomeWrapper>
      <h1>Welcome to the Dashboard!</h1>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </HomeWrapper>
  );
};

export default Home;
