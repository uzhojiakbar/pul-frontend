import React, { useState } from "react";
import styled from "styled-components";
import { Button, message } from "antd";
import { useAddTransaction } from "../../hook/useTransactions";
import { useCategories } from "../../hook/useCategorires";
import Loading from "../../components/Loading/Loading";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  padding: 20px;
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
    background-color: #e8f5e9; // Yashil ohang
  }

  &.active {
    background-color: #4caf50;
    color: white;
    border: none;
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const CancelButton = styled(Button)`
  background-color: #f44336;
  color: white;
  border: none;

  &:hover {
    background-color: #d32f2f;
  }
  &:focus {
    background-color: #d32f2f;
    color: white;
  }
`;

const ActionButton = styled(Button)`
  background-color: #4caf50;

  &:hover {
    background-color: #5bca5f !important;
  }
`;

const NewIncome = ({ home = 0 }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [paymentType, setPaymentType] = useState(""); // To'lov turi
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // Kategoriya ID
  const [loading, setLoading] = useState(false);

  const { mutate: addTransaction } = useAddTransaction();
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!amount || !selectedCategoryId || !paymentType) {
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

    // Tranzaksiyani yuborish
    addTransaction(
      {
        date: moment().format("YYYY-MM-DD"),
        category: selectedCategory.name,
        amount: parseFloat(amount),
        description,
        type: "income",
        payment: paymentType.toUpperCase(), // UZS yoki USD
      },
      {
        onSuccess: () => {
          message.success("Tranzaksiya muvaffaqiyatli qo'shildi!");
          setAmount("");
          setSelectedCategoryId("");
          setPaymentType("");
          setLoading(false);
        },
        onError: () => {
          message.error("Tranzaksiyani qo'shishda xatolik yuz berdi.");
          setLoading(false);
        },
      }
    );
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
      <Label>Description:</Label>
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
        {["UZS", "Karta", "USD"].map((option) => (
          <OptionButton
            key={option}
            onClick={() => setPaymentType(option)}
            className={paymentType === option ? "active" : ""}
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
              onClick={() => setSelectedCategoryId(cat._id)} // ID tanlanadi
              className={selectedCategoryId === cat._id ? "active" : ""}
            >
              {cat.name} {/* Nomi ko'rsatiladi */}
            </OptionButton>
          ))}
        </SelectionWrapper>
      )}

      {home === 0 ? (
        <ActionsWrapper>
          <CancelButton onClick={() => navigate("/")}>
            Bekor qilish
          </CancelButton>
          <ActionButton
            type="primary"
            onClick={handleSubmit}
            disabled={loading} // Loading paytida tugma o'chiriladi
            style={{ background: "#4caf50" }}
          >
            Qo'shish
          </ActionButton>
        </ActionsWrapper>
      ) : (
        <ActionButton
          type="primary"
          onClick={handleSubmit}
          disabled={loading} // Loading paytida tugma o'chiriladi
        >
          Qo'shish
        </ActionButton>
      )}
    </Wrapper>
  );
};

export default NewIncome;
