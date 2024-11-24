import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, message } from "antd";
import { isTokenExpired, loginUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Cookies from "js-cookie";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(
    135deg,
    #c5e1a5,
    #a5d6a7
  ); /* To‘qroq yashil ohanglar */
`;

const LoginCard = styled.div`
  min-width: 350px;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  background: #ffffff;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #388e3c; /* Yashil ohang */
  font-family: "Poppins", sans-serif;
`;

const StyledFormItem = styled(Form.Item)`
  .ant-form-item-control-input-content {
    display: flex;
    align-items: center;
  }

  .ant-input {
    padding-left: 40px;
    border-radius: 8px;
  }

  .ant-input-password {
    padding-left: 40px;
  }

  .anticon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    color: #000000; /* Oq rangni o‘rniga qora rang */
  }
`;

const StyledButton = styled(Button)`
  background-color: #388e3c !important; /* Yashil rang */
  color: #ffffff !important;
  border: none !important;
  height: 48px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;

  &:hover {
    background-color: #2e7d32 !important;
  }

  &:focus {
    background-color: #388e3c !important;
    outline: none;
  }
`;

const ForgotPassword = styled.div`
  text-align: center;
  margin-top: 16px;
  font-size: 14px;

  a {
    color: #388e3c;
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
      // Ant Design form values mapping
      const payload = {
        username: values.username,
        password: values.password,
      };

      const response = await axiosInstance.post("/auth/login/", payload);
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
        <Title>Welcome Back!</Title>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <StyledFormItem
            name="username"
            rules={[{ required: true, message: "Username kiriting!" }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#000000" }} />}
              placeholder="Username"
              size="large"
              style={{
                paddingLeft: "40px",
              }} /* Yozuvlar joyi icondan so‘ng keladi */
            />
          </StyledFormItem>
          <StyledFormItem
            name="password"
            rules={[{ required: true, message: "Parolni kiriting!" }]}
          >
            <Input.Password
              placeholder="Parol"
              size="large"
              style={{
                paddingLeft: "40px",
              }} /* Yozuvlar joyi icondan so‘ng keladi */
            />
          </StyledFormItem>

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
