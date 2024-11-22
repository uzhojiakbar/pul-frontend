// hooks/useCategories.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

// Kategoriyalarni olish
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await instance.get("/categories");
      return response.data; // Kategoriyalarni qaytaradi
    },
    staleTime: 1000 * 60 * 5, // 5 daqiqa keshlash
  });
};

// Kategoriya qo‘shish
export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCategory) => {
      const response = await instance.post("/categories", newCategory);
      return response.data; // Yangi kategoriya
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]); // Ma'lumotni yangilash
    },
  });
};

// Kategoriya o‘chirish
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (categoryId) => {
      await instance.delete(`/categories/${categoryId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]); // Ma'lumotni yangilash
    },
  });
};
