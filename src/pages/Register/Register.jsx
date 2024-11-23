import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, message } from "antd";
import { useRegisterUser } from "../../hook/useAuth.js";
import { useNavigate } from "react-router-dom";

const RegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #ffffff;
`;

const RegisterCard = styled.div`
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

const AlreadyHaveAccount = styled.div`
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
        <Title>Hisob yaratish</Title>
        <Form name="register" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Username kiriting!" },
              {
                min: 4,
                message: "Username kamida 4 ta belgidan iborat bo'lishi kerak!",
              },
            ]}
          >
            <Input placeholder="Username" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Parolni kiriting!" },
              {
                min: 6,
                message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak!",
              },
            ]}
          >
            <Input.Password placeholder="Parol" size="large" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: "Parolni qayta kiriting!" }]}
          >
            <Input.Password placeholder="Parolni tasdiqlang" size="large" />
          </Form.Item>
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
