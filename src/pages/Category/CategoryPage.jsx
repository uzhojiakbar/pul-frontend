import React, { useState, useEffect, useRef, Suspense } from "react";
import styled from "styled-components";
import { Button, List, Input, Modal, message, Select } from "antd";
import { PlusOutlined, SmileOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useCategories,
  useAddCategory,
  useDeleteCategory,
} from "../../hook/useCategorires";
import Loading from "../../components/Loading/Loading";
import { Emoji } from "emoji-picker-react";

const EmojiPicker = React.lazy(() =>
  import("emoji-picker-react").catch(() => ({
    default: () => <div>Failed to load emoji picker</div>,
  }))
);

// Styled Components
const PageWrapper = styled.div`
  background-color: #f4f5f7;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const StyledButton = styled(Button)`
  background: linear-gradient(90deg, #43a047, #4caf50);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;

  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  padding: 30px;
  border: 2px solid transparent !important;

  width: 100%;

  &:hover {
    background: white !important;
    border: 2px solid #4caf50 !important;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2) !important;
    color: #4caf50 !important;
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 24px;
    background: #f4f5f7; /* Modaldagi yangi rang */
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .ant-modal-header {
    background-color: transparent;

    color: white;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    padding: 16px;
    border-radius: 24px 24px 0 0;
  }

  .ant-modal-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 24px;
    color: black;
  }

  .ant-modal-footer {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 16px;
    background-color: #f4f5f7; /* Modaldagi footer rang */
    border-top: none;
  }
`;

const CardInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-weight: bold;
    color: black;
    font-size: 16px;
    margin-bottom: 4px;
  }

  input,
  .ant-select-selector {
    background-color: #ffffff; /* Sayt fon rangi */
    border: 1px solid #43a047;
    border-radius: 8px;
    padding: 12px 16px;
    color: #000000;
    font-size: 16px;
    font-weight: bold;
    box-shadow: none;
    outline: none;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e8f5e9;
    }

    &:focus {
      background-color: #c8e6c9;
      border: 2px solid #43a047;
    }

    &::placeholder {
      color: #9e9e9e;
    }
  }
`;

const StyledListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  background: ${({ type }) =>
    type === "income"
      ? "rgba(129, 199, 132, 0.8)"
      : "rgba(229, 115, 115, 0.8)"};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);

    .del {
    }
  }
`;

const StyledListItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledText = styled.span`
  color: white;
  font-weight: 600;
  text-transform: capitalize;
  font-size: 16px;
`;

const StyledDeleteButton = styled(Button)`
  background-color: rgba(244, 67, 54, 0.6);
  color: white;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    color: #d32f2f !important;
  }
`;

const EmojiPickerContainer = styled.div`
  position: relative;

  .emoji-picker {
    position: absolute;
    top: 50px;
    z-index: 1000;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 8px;
  }
`;

const CategoryPage = () => {
  const { data: categories = [], isLoading } = useCategories();
  const addCategory = useAddCategory();
  const deleteCategory = useDeleteCategory();

  const [newCategory, setNewCategory] = useState("");
  const [newCategoryType, setNewCategoryType] = useState("income");
  const [selectedEmoji, setSelectedEmoji] = useState("😊");
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      message.error("Kategoriya nomi bo‘sh bo‘lishi mumkin emas!");
      return;
    }

    addCategory.mutate(
      { name: newCategory, type: newCategoryType, emoji: selectedEmoji },
      {
        onSuccess: () => {
          message.success("Kategoriya muvaffaqiyatli qo‘shildi!");
          setNewCategory("");
          setNewCategoryType("income");
          setSelectedEmoji("😊");
          setIsModalOpen(false);
        },
        onError: () => {
          message.error("Kategoriya qo‘shishda xatolik yuz berdi.");
        },
      }
    );
  };

  const handleEmojiSelect = (emojiObject) => {
    setSelectedEmoji(emojiObject.unified);
    setPickerOpen(false);
  };

  return (
    <PageWrapper>
      {isLoading && <Loading />}
      <StyledButton onClick={() => setIsModalOpen(true)}>
        <PlusOutlined /> Kategoriya qo'shish
      </StyledButton>

      <StyledModal
        title="Kategoriya qoshish"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={
          <StyledButton onClick={handleAddCategory}>Qo'shish</StyledButton>
        }
      >
        <CardInput>
          <label>Category Name</label>
          <Input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="e.g., Food"
          />
        </CardInput>
        <CardInput>
          <label>Category Type</label>
          <Select
            value={newCategoryType}
            onChange={(value) => setNewCategoryType(value)}
            options={[
              { value: "income", label: "Income" },
              { value: "expense", label: "Expense" },
            ]}
          />
        </CardInput>
        <CardInput>
          <label>Emoji</label>
          <EmojiPickerContainer>
            <Button
              onClick={() => setPickerOpen(!isPickerOpen)}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #43a047",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              Select Emoji:
              <span style={{ fontSize: "18px" }}>
                <Emoji
                  unified={selectedEmoji}
                  size={24}
                  emojiStyle="apple" // Emoji Apple uslubida ko‘rinadi
                />
              </span>
            </Button>

            {isPickerOpen && (
              <div className="emoji-picker">
                <Suspense fallback={<Loading />}>
                  <EmojiPicker onEmojiClick={handleEmojiSelect} />
                </Suspense>
              </div>
            )}
          </EmojiPickerContainer>
        </CardInput>
      </StyledModal>

      <List
        dataSource={categories}
        renderItem={(item) => (
          <StyledListItem key={item._id} type={item.type}>
            <StyledListItemContent>
              <Emoji unified={item.emoji || "1f600"} size={24} />
              <StyledText>{item.name}</StyledText>
            </StyledListItemContent>
            <StyledDeleteButton
              className="del"
              onClick={() => deleteCategory.mutate(item._id)}
            >
              <DeleteOutlined />
            </StyledDeleteButton>
          </StyledListItem>
        )}
      />
    </PageWrapper>
  );
};

export default CategoryPage;
