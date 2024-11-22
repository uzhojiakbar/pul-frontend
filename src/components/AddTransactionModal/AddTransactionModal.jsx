import React, { useState } from "react";
import { Modal, Input, DatePicker, Button, message } from "antd";
import styled from "styled-components";
import moment from "moment";
import { useAddTransaction } from "../../hook/useTransactions";

const StyledButton = styled(Button)`
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #43a047;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
`;

const CategoryButton = styled.button`
  background-color: ${({ selected }) => (selected ? "#4caf50" : "#f0f0f0")};
  color: ${({ selected }) => (selected ? "white" : "#333")};
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ selected }) => (selected ? "#43a047" : "#e0e0e0")};
  }

  &:focus {
    outline: none;
  }
`;

const AddTransactionModal = ({ isOpen, onClose, type }) => {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD")); // Hozirgi sanani boshlang'ich qiymat sifatida tanlang
  const [amount, setAmount] = useState("");
  const [payment, setPayment] = useState("cash");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories] = useState(["Food", "Salary", "Savings", "Other"]); // Kategoriya ro'yxati

  const addTransaction = useAddTransaction();

  const handleSubmit = () => {
    if (!date || !amount || !selectedCategory) {
      message.error("Barcha maydonlarni to'ldiring!");
      return;
    }

    const transactionData = {
      date: moment(date).format("YYYY-MM-DD"),
      amount: Number(amount),
      type, // Modalga kirganda income yoki expense keladi
      payment,
      category: selectedCategory,
    };

    addTransaction.mutate(transactionData, {
      onSuccess: () => {
        message.success("Tranzaktsiya muvaffaqiyatli qo'shildi!");
        onClose();
        setDate(moment());
        setAmount("");
        setSelectedCategory("");
      },
      onError: () => {
        message.error("Tranzaktsiyani qo'shishda xatolik yuz berdi!");
      },
    });
  };

  return (
    <Modal
      title={type === "income" ? "Yangi daromad" : "Yangi xarajat"}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Bekor qilish
        </Button>,
        <StyledButton key="submit" onClick={handleSubmit}>
          Qo'shish
        </StyledButton>,
      ]}
    >
      {/* Sana */}
      <div>
        <p>Sana:</p>
        <DatePicker
          value={date ? moment(date, "YYYY-MM-DD") : null} // To'g'ri formatda qiymat uzatish
          onChange={(value) =>
            setDate(value ? value.format("YYYY-MM-DD") : null)
          } // O'zgarishni qayta sozlash
          format="YYYY-MM-DD" // To'g'ri formatni belgilang
        />
      </div>

      {/* Summani kiriting */}
      <div style={{ marginTop: "16px" }}>
        <p>Summani kiriting:</p>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Mablag'ni kiriting"
        />
      </div>

      {/* To'lov turi */}
      <div style={{ marginTop: "16px" }}>
        <p>To'lov turi:</p>
        <div>
          <Button
            type={payment === "cash" ? "primary" : "default"}
            onClick={() => setPayment("cash")}
          >
            Naqd
          </Button>
          <Button
            type={payment === "card" ? "primary" : "default"}
            onClick={() => setPayment("card")}
            style={{ marginLeft: 10 }}
          >
            Karta
          </Button>
          <Button
            type={payment === "dollar" ? "primary" : "default"}
            onClick={() => setPayment("dollar")}
            style={{ marginLeft: 10 }}
          >
            Dollar
          </Button>
        </div>
      </div>

      {/* Kategoriyalar */}
      <div style={{ marginTop: "16px" }}>
        <p>Kategoriya:</p>
        <CategoryWrapper>
          {categories.map((cat) => (
            <CategoryButton
              key={cat}
              selected={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </CategoryButton>
          ))}
        </CategoryWrapper>
      </div>
    </Modal>
  );
};

export default AddTransactionModal;
