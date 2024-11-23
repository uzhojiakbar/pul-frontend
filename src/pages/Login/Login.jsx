import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, message } from "antd";
import { isTokenExpired, loginUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Cookies from "js-cookie";

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #ffffff;
`;

const LoginCard = styled.div`
  min-width: 320px;

  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 24px;
  color: #000000;
`;

const StyledButton = styled(Button)`
  background-color: #007bff !important;
  color: #ffffff !important;
  border: none !important;
  height: 40px;
  font-size: 16px;

  &:hover {
    background-color: #0056b3 !important;
    color: #ffffff !important;
  }
`;

const ForgotPassword = styled.div`
  text-align: center;
  margin-top: 16px;
  font-size: 14px;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token && isTokenExpired(token)) {
      message.warning("Sessiya tugagan, qayta kiring!");
    }
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login/", values);
      const { token, id, username } = response.data;
      loginUser(token, id, username);
      message.success("Kirish muvaffaqiyatli!");
      navigate("/");
      document.location.reload();
    } catch (error) {
      message.error(error.response?.data?.error || "Kirishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <Title>Hisobga kirish</Title>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Username kiriting!" }]}
          >
            <Input placeholder="Username" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Parolni kiriting!" }]}
          >
            <Input.Password placeholder="Пароль" size="large" />
          </Form.Item>
          <Form.Item>
            <StyledButton
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Kirish
            </StyledButton>
          </Form.Item>
        </Form>
        <ForgotPassword>
          <a href="/create-account">Ro'yxatdan o'tish</a>
        </ForgotPassword>
      </LoginCard>
    </LoginWrapper>
  );
};

export default Login;
