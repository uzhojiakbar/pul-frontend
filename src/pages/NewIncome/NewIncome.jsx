import React, { useState } from "react";
import styled from "styled-components";
import { Button, message } from "antd";
import { useAddTransaction } from "../../hook/useTransactions";
import { useCategories } from "../../hook/useCategorires";
import Loading from "../../components/Loading/Loading";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

const SelectionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const OptionButton = styled.button`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-size: 14px;
  cursor: pointer;
  flex: 1 1 calc(33.333% - 10px);
  text-align: center;

  &:hover {
    background-color: #e8f5e9;
  }

  &.active {
    background-color: #4caf50;
    color: white;
    border: none;
  }
`;

const ActionButton = styled(Button)`
  background-color: #4caf50;

  &:hover {
    background-color: #5bca5f !important;
  }
`;

const NewIncome = ({ close = () => {}, loading, setLoading }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [typeMoney, setTypeMoney] = useState(""); // "naqt" yoki "karta"
  const [payment, setPayment] = useState(""); // "UZS" yoki "USD"
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const { mutate: addTransaction } = useAddTransaction();
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories("income"); // Income kategoriyalarini olish
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!amount || !selectedCategoryId || !typeMoney || !payment) {
      message.error("Hamma maydonlarni to'ldiring!");
      return;
    }

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
        date: moment().format("YYYY-MM-DD"),
        category: selectedCategory.name,
        amount: parseFloat(amount),
        description,
        type: "income", // yoki "expense"
        typeMoney, // "naqt" yoki "karta"
        payment, // "UZS" yoki "USD"
      },
      {
        onSuccess: () => {
          message.success("Tranzaksiya muvaffaqiyatli qo'shildi!");
          setAmount("");
          setSelectedCategoryId("");
          setTypeMoney("");
          setPayment("");
          setLoading(false);
          navigate("/"); // Asosiy sahifaga qaytish
        },
        onError: () => {
          message.error("Tranzaksiyani qo'shishda xatolik yuz berdi.");
          setLoading(false);
        },
      }
    );

    close();
  };

  return (
    <Wrapper>
      {loading && <Loading />}
      <Label>Summa:</Label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Miqdor kiriting"
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      />
      <Label>Izoh:</Label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Malumot kiriting"
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
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
              {cat.name}
            </OptionButton>
          ))}
        </SelectionWrapper>
      )}

      <ActionButton type="primary" onClick={handleSubmit} disabled={loading}>
        Qo'shish
      </ActionButton>
    </Wrapper>
  );
};

export default NewIncome;
