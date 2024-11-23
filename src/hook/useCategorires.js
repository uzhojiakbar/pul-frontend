import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

// Kategoriyalarni olish
export const useCategories = (type) => {
  return useQuery({
    queryKey: ["categories", type],
    queryFn: async () => {
      const { data } = await instance.get("/categories", {
        params: { type }, // "income" yoki "expense"
      });
      return data;
    },
    staleTime: 1000 * 60 * 10, // 10 daqiqa
  });
};

// Kategoriya qo'shish
export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCategory) => {
      const { data } = await instance.post("/categories", newCategory);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};

// Kategoriya o'chirish
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (categoryId) => {
      await instance.delete(`/categories/${categoryId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};
