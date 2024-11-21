import React, { useState } from "react";
import { Modal, Radio, Button } from "antd";
import styled from "styled-components";
import DateRangePicker from "../DateRangePicker/DateRangePicker"; // Moslashtirilgan DatePicker

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledModal = styled(Modal)`
  min-width: 320px; /* Minimal kenglik */
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
    justify-content: space-between; /* Joylashuvni belgilash */
    gap: 10px; /* Tugmalar orasidagi bo‘shliq */
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px; /* Tugmalar orasidagi bo‘shliq */
`;

const FilterModal = ({ isOpen, onClose, onApply }) => {
  const [filterType, setFilterType] = useState(null); // Kirim/Chiqim
  const [paymentType, setPaymentType] = useState(null); // Naqd, Dollar, Karta
  const [dateRange, setDateRange] = useState(null); // Sanalar

  const handleApply = () => {
    onApply({
      filterType,
      paymentType,
      dateRange,
    });
    onClose();
  };

  const handleReset = () => {
    setFilterType(null);
    setPaymentType(null);
    setDateRange(null);
  };

  return (
    <StyledModal
      title="Filterni tanlang"
      visible={isOpen}
      onCancel={onClose}
      footer={[
        <StyledButton key="cancel" primary="cancel" onClick={onClose}>
          Bekor qilish
        </StyledButton>,
        <ButtonGroup key={"qollash-tozalash"}>
          <StyledButton key="reset" onClick={handleReset}>
            Tozalash
          </StyledButton>
          <StyledButton key="apply" primary="ok" onClick={handleApply}>
            Qo'llash
          </StyledButton>
        </ButtonGroup>,
      ]}
    >
      <FilterWrapper>
        {/* Kirim/Chiqim */}
        <div>
          <p>Kirim yoki Chiqim:</p>
          <Radio.Group
            onChange={(e) => setFilterType(e.target.value)}
            value={filterType}
          >
            <Radio value="income">Kirim</Radio>
            <Radio value="expense">Chiqim</Radio>
          </Radio.Group>
        </div>

        {/* To'lov turi */}
        <div>
          <p>To'lov turi:</p>
          <Radio.Group
            onChange={(e) => setPaymentType(e.target.value)}
            value={paymentType}
          >
            <Radio value="cash">Naqd</Radio>
            <Radio value="card">Karta</Radio>
            <Radio value="dollar">Dollar</Radio>
          </Radio.Group>
        </div>

        {/* Sanalar */}
        <div>
          <p>Sanani tanlang:</p>
          <DateRangePicker
            onDateChange={(range) => setDateRange(range)}
            startDate={dateRange ? dateRange[0] : null}
            endDate={dateRange ? dateRange[1] : null}
          />
        </div>
      </FilterWrapper>
    </StyledModal>
  );
};

export default FilterModal;
