import React, { useState } from "react";
import styled from "styled-components";
import { Button, List, Input, Modal, message, Divider } from "antd";
import {
  useCategories,
  useAddCategory,
  useDeleteCategory,
} from "../../hook/useCategorires";
import Loading from "../../components/Loading/Loading";

const PageWrapper = styled.div`
  padding: 16px;
`;

const Title = styled.h1`
  text-align: center;
  color: #4caf50;
`;

const TitleWithBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  background-color: #4caf50;
  color: white;
  border: none;

  transition: 0.2s;

  &:hover {
    background-color: #43a047;
    color: black !important;
    border: none;
  }

  &:focus {
    background-color: #4caf50;
    color: black !important;
    border: none;
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
  padding: 16px;
`;

const CategoryPage = () => {
  const { data: categories = [], isLoading } = useCategories();
  const addCategory = useAddCategory();
  const deleteCategory = useDeleteCategory();

  const [newCategory, setNewCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);

  const handleAddCategory = () => {
    setGlobalLoading(1);

    if (!newCategory.trim()) {
      message.error("Kategoriya nomi bo‘sh bo‘lishi mumkin emas!");
      return;
    }
    addCategory.mutate(
      { name: newCategory },
      {
        onSuccess: () => {
          message.success("Kategoriya muvaffaqiyatli qo‘shildi!");
          setNewCategory("");
          setIsModalOpen(false);
          setGlobalLoading(false);
        },
        onError: () => {
          message.error("Kategoriya qo‘shishda xatolik yuz berdi.");
        },
      }
    );
  };

  const handleDeleteCategory = (id) => {
    setGlobalLoading(1);
    deleteCategory.mutate(id, {
      onSuccess: () => {
        message.success("Kategoriya muvaffaqiyatli o‘chirildi!");
        setGlobalLoading(0);
      },
      onError: () => {
        message.error("Kategoriya o‘chirishda xatolik yuz berdi.");
      },
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddCategory();
    }
  };

  return (
    <PageWrapper>
      {globalLoading ? <Loading /> : ""}
      <TitleWithBtn>
        <Title>Kategoriyalar</Title>
        <StyledButton onClick={() => setIsModalOpen(true)}>
          Kategoriya qo‘shish
        </StyledButton>
      </TitleWithBtn>

      {/* Kategoriya qo‘shish modali */}
      <Modal
        title="Yangi kategoriya qo‘shish"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddCategory}
        okText="Qo‘shish"
        okButtonProps={{
          style: { backgroundColor: "#4caf50", color: "white" },
        }}
      >
        <Input
          placeholder="Kategoriya nomi"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          onKeyPress={handleKeyPress} // Enter tugmasini bosish funksiyasi
        />
      </Modal>

      {/* Kategoriyalar ro‘yxati */}
      <CategoryList
        loading={isLoading}
        bordered
        dataSource={categories}
        renderItem={(item, index) => (
          <>
            {index !== 0 && <StyledDivider />} {/* Ajratish uchun chiziq */}
            <List.Item
              actions={[
                <StyledButton
                  type="link"
                  danger
                  style={{
                    color: "#f44336", // Tugma matni rangi
                    backgroundColor: "transparent", // Orqa fonni olib tashlash
                    border: "none", // Chegaralarni olib tashlash
                    boxShadow: "none", // Tugmani tekis qilish
                  }}
                  onClick={() => handleDeleteCategory(item._id)}
                >
                  O‘chirish
                </StyledButton>,
              ]}
            >
              {item.name}
            </List.Item>
          </>
        )}
      />
    </PageWrapper>
  );
};

export default CategoryPage;
