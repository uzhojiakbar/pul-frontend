import React, { useState } from "react";
import styled from "styled-components";
import { Button, message, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAddTransaction } from "../../hook/useTransactions";
import { useCategories, useAddCategory } from "../../hook/useCategorires";
import Loading from "../../components/Loading/Loading";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Emoji } from "emoji-picker-react";
import CategoryPage from "../Category/CategoryPage";
import Sidebar from "../../components/Sidebar/Sidebar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #333333;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ error }) => (error ? "#f44336" : "#cccccc")};
  color: #333333;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
  background: ${({ error }) => (error ? "#ffebee" : "#fff")};

  &:focus {
    border-color: ${({ error }) => (error ? "#f44336" : "#4caf50")};
    background: ${({ error }) => (error ? "#ffebee" : "#f8f8f8")};
  }

  &::placeholder {
    color: #888888;
  }
`;

const SelectionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const OptionButton = styled.button`
  padding: 12px;
  border: 1px solid #cccccc;
  border-radius: 12px;
  background: #f9f9f9;
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  cursor: pointer;
  transition: all 0.3s ease;

  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #e8f5e9;
    border-color: #4caf50;
    color: #4caf50;
  }

  &.active {
    background: #4caf50;
    color: white;
    border-color: #4caf50;
  }
`;

const AddCategoryButton = styled(OptionButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  .icon {
    font-size: 16px;
    color: #333333;
  }
`;

const ActionButton = styled(Button)`
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color: #43a047 !important;
  }

  &:active {
    background-color: #388e3c !important;
  }
`;

const NewIncome = ({ close = () => {}, loading, setLoading }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [typeMoney, setTypeMoney] = useState("");
  const [payment, setPayment] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [error, setError] = useState(null);

  const { mutate: addTransaction } = useAddTransaction();
  const { mutate: addCategory } = useAddCategory();
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories("income");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!amount || !selectedCategoryId || !typeMoney || !payment) {
      setError("Hamma maydonlarni to'ldiring!");
      return;
    }

    setError(null);
    setLoading(true);

    const selectedCategory = categories.find(
      (cat) => cat._id === selectedCategoryId
    );

    if (!selectedCategory) {
      message.error("Kategoriya topilmadi!");
      setLoading(false);
      return;
    }

    addTransaction(
      {
        date: moment().format("YYYY-MM-DD HH:mm"),
        category: selectedCategory.name,
        amount: parseFloat(amount),
        description,
        type: "income",
        typeMoney,
        payment,
      },
      {
        onSuccess: () => {
          message.success("Tranzaksiya muvaffaqiyatli qo'shildi!");
          setAmount("");
          setSelectedCategoryId("");
          setTypeMoney("");
          setPayment("");
          setLoading(false);
          navigate("/");
        },
        onError: () => {
          message.error("Tranzaksiyani qo'shishda xatolik yuz berdi.");
          setLoading(false);
        },
      }
    );

    close();
  };

  const toggleCancel = () => {
    setIsModalOpen(0);
  };

  const formatAmount = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Wrapper>
      {loading && <Loading />}
      <Label>Summa:</Label>
      <Input
        type="text"
        value={formatAmount(amount)}
        onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
        placeholder="Miqdor kiriting"
        error={error}
      />
      {error && <div style={{ color: "red", fontSize: "12px" }}>{error}</div>}
      <Label>Izoh:</Label>
      <Input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Ma'lumot kiriting"
      />

      <Label>To'lov turi:</Label>
      <SelectionWrapper>
        {["naqt", "karta"].map((option) => (
          <OptionButton
            key={option}
            onClick={() => setTypeMoney(option)}
            className={typeMoney === option ? "active" : ""}
          >
            {option.toUpperCase()}
          </OptionButton>
        ))}
      </SelectionWrapper>

      <Label>Valyuta turi:</Label>
      <SelectionWrapper>
        {["UZS", "USD"].map((option) => (
          <OptionButton
            key={option}
            onClick={() => setPayment(option)}
            className={payment === option ? "active" : ""}
          >
            {option}
          </OptionButton>
        ))}
      </SelectionWrapper>

      <Label>Kategoriya:</Label>
      {isCategoriesLoading ? (
        <p>Kategoriyalar yuklanmoqda...</p>
      ) : (
        <SelectionWrapper>
          {categories.map((cat) => (
            <OptionButton
              key={cat._id}
              onClick={() => setSelectedCategoryId(cat._id)}
              className={selectedCategoryId === cat._id ? "active" : ""}
            >
              <Emoji unified={cat.emoji || "1f600"} size={24} />
              {cat.name}
            </OptionButton>
          ))}
          <AddCategoryButton onClick={() => setIsModalOpen(true)}>
            <PlusOutlined className="icon" /> qo'shish
          </AddCategoryButton>
        </SelectionWrapper>
      )}

      <ActionButton type="primary" onClick={handleSubmit} disabled={loading}>
        Qo'shish
      </ActionButton>

      <Sidebar
        title="Kategoriya qo'shsh"
        isOpen={isModalOpen}
        onClose={toggleCancel}
      >
        <CategoryPage />
      </Sidebar>
    </Wrapper>
  );
};

export default NewIncome;
