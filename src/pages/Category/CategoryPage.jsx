import React, { useState, useEffect, useRef, Suspense } from "react";
import styled from "styled-components";
import { Button, List, Input, Modal, message, Tag, Select } from "antd";
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

  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const StyledButton = styled(Button)`
  background-color: #4caf50;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #43a047;
    color: white;
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
  }

  .ant-modal-header {
    background-color: #e8f5e9;
    border-bottom: none;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
  }

  .ant-modal-footer {
    display: flex;
    justify-content: center;
    gap: 16px;
  }
`;

const EmojiPickerWrapper = styled.div`
  position: absolute;
  z-index: 1000;
  top: 50px;
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 8px;
  text-transform: capitalize;
  cursor: pointer;

  background-color: ${({ type }) =>
    type === "income"
      ? "rgba(129, 199, 132, 0.2)"
      : "rgba(229, 115, 115, 0.2)"};

  box-shadow: 2px 2px 2px
    ${({ type }) =>
      type === "income"
        ? "rgba(129, 199, 132, 0.6)"
        : "rgba(229, 115, 115, 0.6)"};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ type }) =>
      type === "income"
        ? "rgba(129, 199, 132, 0.3)"
        : "rgba(229, 115, 115, 0.3)"};

    box-shadow: -2px -2px 2px ${({ type }) => (type === "income" ? "rgba(129, 199, 132, 0.6)" : "rgba(229, 115, 115, 0.6)")};
  }
`;

const EmojiContainer = styled.div`
  font-size: 20px;
  margin-right: 10px;
`;

const StyledDeleteButton = styled(Button)`
  color: red !important;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    .text {
      display: none; /* Mobil uchun faqat ikonka ko‘rinadi */
    }

    .icon {
      font-size: 20px !important; /* Ikonka kattaligi oshiriladi */
      color: red !important; /* Ikonka rangi qizil */
    }
  }
`;

const CategoryPage = () => {
  const { data: categories = [], isLoading } = useCategories();
  const addCategory = useAddCategory();
  const deleteCategory = useDeleteCategory();

  const [newCategory, setNewCategory] = useState("");
  const [newCategoryType, setNewCategoryType] = useState("income");
  const [selectedEmoji, setSelectedEmoji] = useState("😊"); // Default emoji
  const emojiPickerRef = useRef(null);
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      message.error("Kategoriya nomi bo‘sh bo‘lishi mumkin emas!");
      return;
    }

    setGlobalLoading(true);

    addCategory.mutate(
      { name: newCategory, type: newCategoryType, emoji: selectedEmoji },
      {
        onSuccess: () => {
          message.success("Kategoriya muvaffaqiyatli qo‘shildi!");
          setNewCategory("");
          setNewCategoryType("income");
          setSelectedEmoji("😊");
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

  const handleEmojiSelect = (emojiObject) => {
    setSelectedEmoji(emojiObject.unified); // Emoji Unicode saqlanadi
    setPickerOpen(false); // Picker-ni yopish
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setPickerOpen(false);
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
      <StyledButton onClick={() => setIsModalOpen(true)}>
        <PlusOutlined /> Kategoriya qo‘shish
      </StyledButton>
      <StyledModal
        title="Yangi kategoriya qo‘shish"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button
            key="add"
            onClick={handleAddCategory}
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              borderRadius: "8px",
              fontWeight: "bold",
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
              onClick={() => setPickerOpen((prev) => !prev)}
              style={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            >
              <Emoji unified={selectedEmoji} size={20} />{" "}
              {/* Tanlangan emoji */}
            </Button>

            {isPickerOpen && (
              <EmojiPickerWrapper ref={emojiPickerRef}>
                <Suspense fallback={<div>Yuklanmoqda...</div>}>
                  <EmojiPicker
                    onEmojiClick={(emojiObject) =>
                      handleEmojiSelect(emojiObject)
                    }
                    lazyLoadEmojis
                    emojiStyle="apple" // Emoji dizayni
                  />
                </Suspense>
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

      {/* Kategoriya ro‘yxati */}
      <List
        dataSource={categories}
        renderItem={(item) => (
          <StyledListItem key={item._id} type={item.type}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Emoji yoki default emoji */}
              <EmojiContainer>
                <Emoji unified={item.emoji || "1f600"} size={20} />{" "}
                {/* Default smile */}
              </EmojiContainer>
              <span>{item.name}</span>
            </div>
            {/* O‘chirish tugmasi */}
            <StyledDeleteButton
              // icon={}
              onClick={() => handleDeleteCategory(item._id)}
              type="text"
            >
              <span className="icon">
                <DeleteOutlined />
              </span>
              <span className="text">O‘chirish</span>
            </StyledDeleteButton>
          </StyledListItem>
        )}
      />
    </PageWrapper>
  );
};

export default CategoryPage;
