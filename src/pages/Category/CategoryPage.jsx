import React, { useState } from "react";
import styled from "styled-components";
import { Button, List, Input, Modal, message, Divider, Tag, Flex } from "antd";
import {
  useCategories,
  useAddCategory,
  useDeleteCategory,
} from "../../hook/useCategorires";
import Loading from "../../components/Loading/Loading";
import { PlusOutlined } from "@ant-design/icons";
import { Select } from "antd";

const PageWrapper = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  color: #4caf50;
  font-size: 24px;
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const StyledButton = styled(Button)`
  background-color: ${({ tur }) => (tur === "del" ? "white" : "#4caf50")};

  color: ${({ tur }) => (tur === "del" ? "#f44336" : "white")};
  transition: 0.2s;
  border: 2px solid transparent;
  padding: 10px 20px;
  width: 100% !important;

  text-align: left !important;

  &:hover {
    background-color: ${({ tur }) =>
      tur === "del" ? "white" : "white"} !important;
    color: ${({ tur }) => (tur === "del" ? "#f44336" : "#4caf50")} !important;
    border: 2px solid ${({ tur }) => (tur === "del" ? "#f44336" : "#4caf50")} !important;
  }

  &:active {
    background-color: ${({ tur }) =>
      tur === "del" ? "#f44336" : "#4caf50"} !important;
    color: ${({ tur }) => (tur === "del" ? "white" : "white")} !important;
    border: 2px solid ${({ tur }) => (tur === "del" ? "#f44336" : "#4caf50")} !important;
  }

  @media (max-width: 480px) {
    .name {
      display: none;
    }

    .icon {
      font-size: 14px;
    }
  }
`;

const StyledDivider = styled(Divider)`
  margin: 12px 0;
  border-top: 2px solid rgb(0, 0, 0, 0.1);
`;

const CategoryList = styled(List)`
  margin-top: 16px;
  background: #fff;
  border-radius: 8px;
  width: 100%;
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
  }

  .ant-modal-header {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    background-color: #f0f9f7;
    text-align: center;
    border-bottom: none;
  }

  .ant-modal-title {
    font-weight: bold;
    color: #4caf50;
  }

  .ant-modal-footer {
    border-top: none;
  }
`;

const StyledListItem = styled(List.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px; /* Yozuv kattaligi oshirildi */
  width: 100%;

  @media (max-width: 480px) {
    display: flex;
    flex-direction: column; /* Telefon versiyada vertikal joylashuv */
    align-items: flex-start;
    width: 100%;
    gap: 10px; /* Ma'lumotlar orasidagi bo‘shliq */
  }
`;

const StyledTag = styled(Tag)`
  font-size: 16px; /* Tag yozuvi kattaligi oshirildi */
`;
const InfoPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Chapga joylash */
  justify-content: center;
  gap: 5px;
  width: 100%;

  .info {
    width: fit-content;
  }
`;

const CategoryPage = () => {
  const { data: categories = [], isLoading } = useCategories(); // Hammasini oladi
  const addCategory = useAddCategory();
  const deleteCategory = useDeleteCategory();

  const [newCategory, setNewCategory] = useState("");
  const [newCategoryType, setNewCategoryType] = useState("income"); // Kirim/chiqim
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);

  const handleAddCategory = () => {
    setGlobalLoading(true);

    if (!newCategory.trim()) {
      message.error("Kategoriya nomi bo‘sh bo‘lishi mumkin emas!");
      setGlobalLoading(false);
      return;
    }

    addCategory.mutate(
      { name: newCategory, type: newCategoryType },
      {
        onSuccess: () => {
          message.success("Kategoriya muvaffaqiyatli qo‘shildi!");
          setNewCategory("");
          setNewCategoryType("income");
          setIsModalOpen(false);
          setGlobalLoading(false);
        },
        onError: () => {
          message.error("Kategoriya qo‘shishda xatolik yuz berdi.");
          setGlobalLoading(false);
        },
      }
    );
  };

  const handleDeleteCategory = (id) => {
    setGlobalLoading(true);

    deleteCategory.mutate(id, {
      onSuccess: () => {
        message.success("Kategoriya muvaffaqiyatli o‘chirildi!");
        setGlobalLoading(false);
      },
      onError: () => {
        message.error("Kategoriya o‘chirishda xatolik yuz berdi.");
        setGlobalLoading(false);
      },
    });
  };

  return (
    <PageWrapper>
      {globalLoading && <Loading />}
      <Flex justify="space-between" align="center">
        <StyledButton onClick={() => setIsModalOpen(true)}>
          <PlusOutlined className="icon" />
          <span>Kategoriya qo‘shish</span>
        </StyledButton>
      </Flex>
      {/* Kategoriya qo‘shish modali */}
      <StyledModal
        title={
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#4caf50",
            }}
          >
            Yangi kategoriya qo‘shish
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button
            onClick={handleAddCategory}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "2px solid #4caf50",
              borderRadius: "8px",
              transition: "0.3s",
              fontSize: "16px",
            }}
          >
            Qo‘shish
          </Button>,
        ]}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "10px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Input
              placeholder="Kategoriya nomi"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "16px",
                height: "40px",
              }}
            />
            <Select
              value={newCategoryType}
              onChange={(value) => setNewCategoryType(value)}
              style={{
                width: "150px",
                borderRadius: "8px",
                fontSize: "16px",
                height: "40px",
              }}
              options={[
                { value: "income", label: "Kirim" },
                { value: "expense", label: "Chiqim" },
              ]}
            />
          </div>
        </div>
      </StyledModal>
      ;{/* Kategoriyalar ro‘yxati */}
      <CategoryList
        loading={isLoading}
        bordered
        dataSource={categories}
        renderItem={(item) => (
          <>
            <StyledListItem>
              <InfoPage
                style={{
                  textTransform: "capitalize",
                  gap: "5px",
                  fontWeight: "600",
                }}
              >
                <span>{item.name}</span>
                <StyledTag
                  className="info"
                  color={item.type === "income" ? "green" : "red"}
                >
                  {item.type === "income" ? "Kirim" : "Chiqim"}
                </StyledTag>
              </InfoPage>

              <div>
                <StyledButton
                  type="link"
                  danger
                  tur={"del"}
                  onClick={() => handleDeleteCategory(item._id)}
                  style={{
                    width: "100%",
                    marginTop: "10px",
                  }}
                >
                  O‘chirish
                </StyledButton>
              </div>
            </StyledListItem>
            <StyledDivider />
          </>
        )}
      />
    </PageWrapper>
  );
};

export default CategoryPage;
