import React, { useState } from "react";
import styled from "styled-components";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAddTransaction } from "../../hook/useTransactions";
import { useCategories } from "../../hook/useCategorires";
import Loading from "../../components/Loading/Loading";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Emoji } from "emoji-picker-react";
import CategoryPage from "../Category/CategoryPage";
import Sidebar from "../../components/Sidebar/Sidebar";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
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
  border: 1px solid #cccccc;
  color: #333333;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #f44336;
    background: #fce4ec;
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
    background: #fdecea;
    border-color: #f44336;
    color: #f44336;
  }

  &.active {
    background: #f44336;
    color: white;
    border-color: #f44336;
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
  background-color: #f44336;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color: #d32f2f !important;
  }

  &:active {
    background-color: #c62828 !important;
  }
`;

const NewExpense = ({ close = () => {}, loading, setLoading }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [typeMoney, setTypeMoney] = useState("");
  const [payment, setPayment] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: addTransaction } = useAddTransaction();
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories("expense");
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
        date: moment().format("YYYY-MM-DD HH:mm"),
        category: selectedCategory.name,
        amount: parseFloat(amount),
        description,
        type: "expense",
        typeMoney,
        payment,
      },
      {
        onSuccess: () => {
          message.success("Tranzaksiya muvaffaqiyatli qo'shildi!");
          // Inputlarni tozalash
          setAmount("");
          setDescription("");
          setSelectedCategoryId("");
          setTypeMoney("");
          setPayment("");
          setLoading(false);
          navigate("/"); // Bosh sahifaga qaytish
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
    setIsModalOpen(false);
  };

  return (
    <Wrapper>
      {loading && <Loading />}
      <Label>Summa:</Label>
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Miqdor kiriting"
      />
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
        title="Kategoriya qo'shish"
        isOpen={isModalOpen}
        direction="left"
        onClose={toggleCancel}
      >
        <CategoryPage />
      </Sidebar>
    </Wrapper>
  );
};

export default NewExpense;
