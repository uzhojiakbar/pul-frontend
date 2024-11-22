// components/TransactionDatePicker.jsx
import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

const TransactionDatePicker = ({ date, setDate }) => {
  const defaultDate = moment(); // Bugungi sana boshlang'ich qiymat

  return (
    <DatePicker
      defaultValue={defaultDate}
      onChange={(value) => {
        if (value) {
          setDate(value); // Faqat to'g'ri tanlangan sana o'rnatiladi
        } else {
          message.error("To'g'ri sanani tanlang!");
        }
      }}
      style={{ width: "100%" }}
      allowClear={false} // Sana tanlashni tozalashni oldini olish
      format="YYYY-MM-DD" // Sana formatini aniq o'rnatish
    />
  );
};

export default TransactionDatePicker;
