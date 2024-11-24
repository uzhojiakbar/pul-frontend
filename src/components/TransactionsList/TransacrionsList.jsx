import React, { useState } from "react";
import styled from "styled-components";
import { Collapse, Empty, Modal, Button, Tooltip } from "antd";
import {
  CreditCardOutlined,
  WalletOutlined,
  DollarCircleOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useTransactions } from "../../hook/useTransactions";

const { Panel } = Collapse;

// Wrapper for the entire list
const ListWrapper = styled.div`
  margin: 16px;
  background-color: #f9f9f9;
  border-radius: 12px;
  height: fit-content;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Transaction item container
const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid #ddd;
  background-color: ${({ type }) =>
    type === "income"
      ? "rgba(129, 199, 132, 0.2)"
      : "rgba(229, 115, 115, 0.2)"};
  border-radius: 8px;
  margin-bottom: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ type }) =>
      type === "income"
        ? "rgba(129, 199, 132, 0.3)"
        : "rgba(229, 115, 115, 0.3)"};
    cursor: pointer;
  }

  .amount-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: bold;
    color: ${({ type }) => (type === "income" ? "#4caf50" : "#e57373")};
  }

  span {
    font-size: 14px;
    font-weight: 500;
  }
`;

// Icon and details container
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .icon {
    font-size: 24px;
    color: ${({ type }) => (type === "income" ? "#4caf50" : "#e57373")};
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .category {
    font-weight: bold;
    text-transform: capitalize;
  }

  .description {
    font-size: 12px;
    color: #757575;
  }
`;

const DateSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  padding: 10px 0;
`;

const NoDataWrapper = styled.div`
  text-align: center;
  padding: 40px;
  color: #757575;

  h3 {
    margin-top: 16px;
  }
`;

const CustomCollapseIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  cursor: pointer;

  .ant-collapse-arrow {
    display: none;
  }
`;

const TransactionsList = () => {
  const filters = {}; // Filtirlar uchun shablon
  const { data: transactions = [], isLoading } = useTransactions(filters);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const date = transaction.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(transaction);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedTransactions).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  return (
    <ListWrapper>
      {isLoading ? (
        <p>Yuklanmoqda...</p>
      ) : transactions.length ? (
        <Collapse
          expandIconPosition="right"
          expandIcon={({ isActive }) => (
            <CustomCollapseIcon>
              {isActive ? <UpOutlined /> : <DownOutlined />}
            </CustomCollapseIcon>
          )}
        >
          {sortedDates.map((date) => (
            <Panel
              key={date}
              header={
                <DateSummary>
                  <span>{moment(date).format("DD-MMMM YYYY")}</span>
                  <span>
                    Balans:
                    {groupedTransactions[date].reduce((total, item) => {
                      const amount =
                        item.payment === "USD"
                          ? item.amount * 12000
                          : item.amount;
                      return item.type === "income"
                        ? total + amount
                        : total - amount;
                    }, 0)}
                  </span>
                </DateSummary>
              }
            >
              {groupedTransactions[date].map((txn, index) => {
                const Icon =
                  txn.typeMoney === "karta" ? (
                    <CreditCardOutlined className="icon" />
                  ) : txn.payment === "USD" ? (
                    <DollarCircleOutlined className="icon" />
                  ) : (
                    <WalletOutlined className="icon" />
                  );

                return (
                  <Tooltip
                    key={index}
                    title="Batafsil ko'rish uchun bosing"
                    placement="top"
                  >
                    <TransactionItem
                      type={txn.type}
                      onClick={() => handleTransactionClick(txn)}
                    >
                      <IconWrapper type={txn.type}>
                        {Icon}
                        <div className="details">
                          <span className="category">{txn.category}</span>
                          <span className="description">{txn.description}</span>
                        </div>
                      </IconWrapper>
                      <div className="amount-wrapper">
                        <span>
                          {txn.payment === "USD"
                            ? `${txn.amount.toLocaleString()} USD`
                            : `${txn.amount.toLocaleString()} UZS`}
                        </span>
                      </div>
                    </TransactionItem>
                  </Tooltip>
                );
              })}
            </Panel>
          ))}
        </Collapse>
      ) : (
        <NoDataWrapper>
          <Empty description="Hozircha ma'lumot yo'q" />
          <h3>Tranzaksiyalarni qo'shing</h3>
        </NoDataWrapper>
      )}

      {/* Modal for transaction details */}
      {selectedTransaction && (
        <Modal
          title="Tranzaksiya detali"
          visible={isModalVisible}
          footer={null}
          onCancel={() => setModalVisible(false)}
        >
          <div>
            <p>
              <b>Kategoriya:</b> {selectedTransaction.category}
            </p>
            <p>
              <b>Summasi:</b> {selectedTransaction.amount.toLocaleString()}{" "}
              {selectedTransaction.payment}
            </p>
            <p>
              <b>Tavsif:</b> {selectedTransaction.description}
            </p>
            <p>
              <b>Sana:</b>{" "}
              {moment(selectedTransaction.date).format("DD-MMMM YYYY")}
            </p>
          </div>
          <Button
            style={{
              marginTop: "10px",
              backgroundColor: "#4caf50",
              color: "white",
              width: "100%",
            }}
            onClick={() => setModalVisible(false)}
          >
            Yopish
          </Button>
        </Modal>
      )}
    </ListWrapper>
  );
};

export default TransactionsList;
