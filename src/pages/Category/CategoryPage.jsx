import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  Button,
  List,
  Input,
  Modal,
  message,
  Divider,
  Tag,
  Select,
} from "antd";
// Import qismi
import EmojiPicker from "emoji-picker-react"; // Default export sifatida import qiling
import {
  useCategories,
  useAddCategory,
  useDeleteCategory,
} from "../../hook/useCategorires";
import Loading from "../../components/Loading/Loading";
import { PlusOutlined, SmileOutlined } from "@ant-design/icons";

const PageWrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

const StyledButton = styled(Button)`
  background-color: ${({ tur }) => (tur === "del" ? "white" : "#4caf50")};
  color: ${({ tur }) => (tur === "del" ? "#f44336" : "white")};
  border: 2px solid transparent;
  padding: 10px 20px;
  width: 100% !important;
  text-align: left !important;
  border-radius: 8px;

  &:hover {
    background-color: white !important;
    color: ${({ tur }) => (tur === "del" ? "#f44336" : "#4caf50")} !important;
    border: 2px solid ${({ tur }) => (tur === "del" ? "#f44336" : "#4caf50")} !important;
  }
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
`;

const EmojiPickerWrapper = styled.div`
  position: absolute;
  z-index: 1000;
  top: 50px;
  left: 0;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 10px;
`;

const StyledListItem = styled(List.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const InfoPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CategoryPage = () => {
  const { data: categories = [], isLoading } = useCategories();
  const addCategory = useAddCategory();
  const deleteCategory = useDeleteCategory();

  const [newCategory, setNewCategory] = useState("");

  const [newCategoryType, setNewCategoryType] = useState("income");

  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [newCategoryEmoji, setNewCategoryEmoji] = useState("😊"); // Default emoji
  const emojiPickerRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      message.error("Kategoriya nomi bo‘sh bo‘lishi mumkin emas!");
      return;
    }

    setGlobalLoading(true);

    addCategory.mutate(
      { name: newCategory, type: newCategoryType, emoji: newCategoryEmoji },
      {
        onSuccess: () => {
          message.success("Kategoriya muvaffaqiyatli qo‘shildi!");
          setNewCategory("");
          setNewCategoryType("income");
          setNewCategoryEmoji("😊");
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
    deleteCategory.mutate(id, {
      onSuccess: () => message.success("Kategoriya muvaffaqiyatli o‘chirildi!"),
      onError: () => message.error("Kategoriya o‘chirishda xatolik yuz berdi."),
    });
  };

  const handleEmojiSelect = (event, emojiObject) => {
    setNewCategoryEmoji(emojiObject.emoji); // Tanlangan emoji Unicode
    setEmojiPickerOpen(false); // Tanlangandan keyin yopish
  };

  // Komponent tashqarisiga bosilganda EmojiPicker-ni yopish
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setEmojiPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <PageWrapper>
      {globalLoading && <Loading />}
      <Button
        onClick={() => setIsModalOpen(true)}
        icon={<PlusOutlined />}
        style={{
          marginBottom: "16px",
          backgroundColor: "#4caf50",
          color: "white",
          borderRadius: "8px",
          padding: "10px 20px",
        }}
      >
        Kategoriya qo‘shish
      </Button>
      <StyledModal
        title="Yangi kategoriya qo‘shish"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button
            onClick={handleAddCategory}
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              borderRadius: "8px",
            }}
          >
            Qo‘shish
          </Button>,
        ]}
      >
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <Button
              icon={<SmileOutlined />}
              onClick={() => setEmojiPickerOpen((prev) => !prev)}
              style={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                fontSize: "16px",
                borderRadius: "8px",
              }}
            >
              {newCategoryEmoji} {/* Tanlangan emoji */}
            </Button>

            {emojiPickerOpen && (
              <EmojiPickerWrapper ref={emojiPickerRef}>
                <EmojiPicker onEmojiClick={handleEmojiSelect} />
              </EmojiPickerWrapper>
            )}
          </div>
          <Input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Kategoriya nomi"
            style={{ flex: 1, borderRadius: "8px" }}
          />
          <Select
            value={newCategoryType}
            onChange={(value) => setNewCategoryType(value)}
            options={[
              { value: "income", label: "Kirim" },
              { value: "expense", label: "Chiqim" },
            ]}
            style={{ width: "150px", borderRadius: "8px" }}
          />
        </div>
      </StyledModal>
      <List
        dataSource={categories}
        renderItem={(item) => (
          <StyledListItem>
            <InfoPage>
              <span>
                {item.emoji} {item.name}
              </span>
              <Tag color={item.type === "income" ? "green" : "red"}>
                {item.type === "income" ? "Kirim" : "Chiqim"}
              </Tag>
            </InfoPage>
            <StyledButton
              tur="del"
              onClick={() => handleDeleteCategory(item._id)}
            >
              O‘chirish
            </StyledButton>
          </StyledListItem>
        )}
      />
    </PageWrapper>
  );
};

export default CategoryPage;
