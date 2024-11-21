import React, { useState } from "react";
import styled from "styled-components";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 45%;
`;

const DateRangePicker = ({ startDate, endDate, onDateChange }) => {
  const [picker, setPicker] = useState(null);

  const handleStartDateChange = (date) => {
    onDateChange([date ? date.format("YYYY-MM-DD") : null, endDate]);
    setPicker(null);
  };

  const handleEndDateChange = (date) => {
    onDateChange([startDate, date ? date.format("YYYY-MM-DD") : null]);
    setPicker(null);
  };

  return (
    <DateContainer>
      <StyledDatePicker
        placeholder="Boshlanish"
        value={startDate ? dayjs(startDate, "YYYY-MM-DD") : null}
        onChange={handleStartDateChange}
        onFocus={() => setPicker("start")}
      />
      <StyledDatePicker
        placeholder="Tugash"
        value={endDate ? dayjs(endDate, "YYYY-MM-DD") : null}
        onChange={handleEndDateChange}
        onFocus={() => setPicker("end")}
      />
    </DateContainer>
  );
};

export default DateRangePicker;
