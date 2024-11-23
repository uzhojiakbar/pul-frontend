import React, { useState } from "react";
import { Modal, Radio, Button } from "antd";
import styled from "styled-components";
import { useTransactions } from "../../hook/useTransactions"; // Hook import qilindi
import DateRangePicker from "../DateRangePicker/DateRangePicker"; // Moslashtirilgan DatePicker

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledModal = styled(Modal)`
  min-width: 320px;
  .ant-modal-content {
    border-radius: 12px;
  }
  .ant-modal-header {
    border-radius: 12px 12px 0 0;
  }
  .ant-modal-title {
    font-weight: bold;
    color: #4caf50;
  }
  .ant-modal-footer {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
`;

const StyledButton = styled(Button)`
  background-color: ${({ primary }) =>
    primary === "ok" ? "#4caf50" : primary === "cancel" ? "red" : "default"};
  color: ${({ primary }) => (primary ? "white" : "default")};

  &:hover {
    background-color: ${({ primary }) =>
      primary === "ok"
        ? "#43a047"
        : primary === "cancel"
        ? "#d32f2f"
        : "default"};
  }
`;

const FilterModal = ({ isOpen, onClose }) => {
  const [filters, setFilters] = useState({
    type: null,
    typeMoney: null,
    payment: null,
    startDate: null,
    endDate: null,
  });

  const { data: transactions, isLoading } = useTransactions(filters);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const handleApply = () => {
    // Filterlar qo'llanadi
    onClose();
  };

  const handleReset = () => {
    setFilters({
      type: null,
      typeMoney: null,
      payment: null,
      startDate: null,
      endDate: null,
    });
  };

  return (
    <StyledModal
      title="Filterni tanlang"
      visible={isOpen}
      onCancel={onClose}
      footer={[
        <StyledButton key="reset" onClick={handleReset}>
          Tozalash
        </StyledButton>,
        <StyledButton key="apply" primary="ok" onClick={handleApply}>
          Qo'llash
        </StyledButton>,
      ]}
    >
      <FilterWrapper>
        {/* Kirim/Chiqim */}
        <div>
          <p>Kirim yoki Chiqim:</p>
          <Radio.Group
            onChange={(e) => handleFilterChange("type", e.target.value)}
            value={filters.type}
          >
            <Radio value="income">Kirim</Radio>
            <Radio value="expense">Chiqim</Radio>
          </Radio.Group>
        </div>

        {/* To'lov turi */}
        <div>
          <p>To'lov turi:</p>
          <Radio.Group
            onChange={(e) => handleFilterChange("typeMoney", e.target.value)}
            value={filters.typeMoney}
          >
            <Radio value="naqt">Naqd</Radio>
            <Radio value="karta">Karta</Radio>
          </Radio.Group>
        </div>

        {/* Valyuta turi */}
        <div>
          <p>Valyuta turi:</p>
          <Radio.Group
            onChange={(e) => handleFilterChange("payment", e.target.value)}
            value={filters.payment}
          >
            <Radio value="UZS">UZS</Radio>
            <Radio value="USD">USD</Radio>
          </Radio.Group>
        </div>

        {/* Sana oralig'i */}
        <div>
          <p>Sanani tanlang:</p>
          <DateRangePicker
            onDateChange={(range) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                startDate: range ? range[0] : null,
                endDate: range ? range[1] : null,
              }))
            }
            startDate={filters.startDate}
            endDate={filters.endDate}
          />
        </div>
      </FilterWrapper>
      {isLoading ? (
        <p>Yuklanmoqda...</p>
      ) : (
        <div>
          <h4>Filtrlangan tranzaktsiyalar:</h4>
          {transactions?.map((txn) => (
            <p key={txn._id}>
              {txn.category}: {txn.amount} {txn.payment}
            </p>
          ))}
        </div>
      )}
    </StyledModal>
  );
};

export default FilterModal;
