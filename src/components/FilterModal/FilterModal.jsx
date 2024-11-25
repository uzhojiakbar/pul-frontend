import React, { useState } from "react";
import { Modal, Radio, Button } from "antd";
import styled from "styled-components";
import { queryClient } from "../../utils/reactQueryClient.js"; // React Query Client

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledModal = styled(Modal)`
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
  color: white;

  &:hover {
    background-color: ${({ primary }) =>
      primary === "ok"
        ? "#43a047"
        : primary === "cancel"
        ? "#d32f2f"
        : "default"};
  }
`;

const FilterModal = ({ isOpen, onClose, onApplyFilters }) => {
  const [filters, setFilters] = useState({
    type: null,
    typeMoney: null,
    payment: null,
    startDate: null,
    endDate: null,
  });

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const handleApply = () => {
    onApplyFilters(filters); // Send filters to the parent component
    onClose();
  };

  const handleReset = () => {
    const defaultFilters = {
      type: null,
      typeMoney: null,
      payment: null,
      startDate: null,
      endDate: null,
    };
    setFilters(defaultFilters);
    onApplyFilters(defaultFilters); // Reset filters in parent
  };

  return (
    <StyledModal
      title="Filterni tanlang"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <StyledButton key="reset" onClick={handleReset} primary="cancel">
          Tozalash
        </StyledButton>,
        <StyledButton key="apply" primary="ok" onClick={handleApply}>
          Qo'llash
        </StyledButton>,
      ]}
    >
      <FilterWrapper>
        <div>
          <p>Kirim yoki Chiqim:</p>
          <Radio.Group
            onChange={(e) => handleFilterChange("type", e.target.value)}
            value={filters.type || null}
          >
            <Radio value="income">Kirim</Radio>
            <Radio value="expense">Chiqim</Radio>
          </Radio.Group>
        </div>
        {/* Qo'shimcha filtrlash */}
      </FilterWrapper>
    </StyledModal>
  );
};

export default FilterModal;
