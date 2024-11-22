import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, message } from "antd";
import { isTokenExpired, loginUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Cookies from "js-cookie";

import Loading from "../../components/Loading/Loading";

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
`;

const LoginCard = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token && isTokenExpired(token)) {
      message.warning("Session expired, please login again!");
    }
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login/", values);
      const { token, id, username } = response.data;
      loginUser(token, id, username);
      message.success("Login successful");
      navigate("/");
      document.location.reload();
    } catch (error) {
      message.error(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </LoginCard>
    </LoginWrapper>
  );
};

export default Login;
