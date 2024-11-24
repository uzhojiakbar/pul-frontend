import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;

  background: rgba(255, 255, 255, 0.8); /* Oq yarim shaffof fon */
  backdrop-filter: blur(5px); /* Fonga blur qo'shish */
  animation: ${fadeIn} 0.3s ease-in-out;

  color: #4caf50; /* Asosiy dizayn rangimiz */
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const Loader = styled.div`
  border: 6px solid rgba(129, 199, 132, 0.2); /* Yashil rang shaffof fon */
  border-radius: 50%;
  border-top: 6px solid #4caf50; /* Yashil rang */
  width: 50px;
  height: 50px;
  animation: ${spin} 0.8s linear infinite; /* Sekinroq aylanish */
  margin-bottom: 16px;
`;

const LoadingText = styled.p`
  margin-top: 8px;
  color: #4caf50;
  font-size: 18px;
`;

const Loading = () => {
  return (
    <LoaderWrapper>
      <Loader />
      <LoadingText>Yuklanmoqda...</LoadingText>
    </LoaderWrapper>
  );
};

export default Loading;
