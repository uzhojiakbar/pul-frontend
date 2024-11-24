import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, message } from "antd";
import { useRegisterUser } from "../../hook/useAuth.js";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const RegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(
    135deg,
    #c5e1a5,
    #a5d6a7
  ); /* To'qroq yashil ohang */
`;

const RegisterCard = styled.div`
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
    color: #000000; /* Qora rang */
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

const AlreadyHaveAccount = styled.div`
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

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { mutate: registerUser } = useRegisterUser();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { username, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      message.error("Parollar mos emas!");
      return;
    }

    setLoading(true);

    registerUser(
      { username, password },
      {
        onSuccess: () => {
          message.success("Hisob muvaffaqiyatli yaratildi!");
          navigate("/login");
        },
        onError: (error) => {
          message.error(
            error.response?.data?.error || "Hisob yaratishda xatolik yuz berdi."
          );
        },
        onSettled: () => {
          setLoading(false);
        },
      }
    );
  };

  return (
    <RegisterWrapper>
      <RegisterCard>
        <Title>Create Account</Title>
        <Form name="register" onFinish={onFinish} layout="vertical">
          <StyledFormItem
            name="username"
            rules={[
              { required: true, message: "Username kiriting!" },
              {
                min: 4,
                message: "Username kamida 4 ta belgidan iborat bo'lishi kerak!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#000000" }} />}
              placeholder="Username"
              size="large"
              style={{ paddingLeft: "40px" }}
            />
          </StyledFormItem>
          <StyledFormItem
            name="password"
            rules={[
              { required: true, message: "Parolni kiriting!" },
              {
                min: 6,
                message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#000000" }} />}
              placeholder="Parol"
              size="large"
              style={{ paddingLeft: "40px" }}
            />
          </StyledFormItem>
          <StyledFormItem
            name="confirmPassword"
            rules={[{ required: true, message: "Parolni qayta kiriting!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Parolni tasdiqlang"
              size="large"
              style={{ paddingLeft: "40px" }}
            />
          </StyledFormItem>
          <Form.Item>
            <StyledButton
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Hisob yaratish
            </StyledButton>
          </Form.Item>
        </Form>
        <AlreadyHaveAccount>
          <a href="/login">Allaqachon hisobingiz bormi? Kirish</a>
        </AlreadyHaveAccount>
      </RegisterCard>
    </RegisterWrapper>
  );
};

export default Register;
