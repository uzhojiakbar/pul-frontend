import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

// Tranzaktsiyalarni olish
export const useTransactions = (filters = {}) => {
  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: async () => {
      const { data } = await instance.get("/transactions", {
        params: filters,
      });
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 daqiqa kechiktirish
    keepPreviousData: true,
    refetchOnWindowFocus: true, // Foydalanuvchi oynaga qaytganida qayta so'rov
    refetchInterval: 10000, // Har 10 soniyada avtomatik yangilanish
  });
};

// Tranzaktsiya qo'shish
export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTransaction) => {
      const { data } = await instance.post("/transactions", newTransaction);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]); // Tranzaktsiyalarni yangilash
      queryClient.invalidateQueries(["balance"]); // Balansni yangilash
    },
    onError: (error) => {
      console.error("Tranzaktsiya qo'shishda xatolik:", error.response?.data);
    },
  });
};

// Tranzaktsiyalarni o'chirish
export const useDeleteAllTransactions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await instance.delete("/transactions/delete-all");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]); // Tranzaktsiyalarni yangilash
      queryClient.invalidateQueries(["balance"]); // Balansni yangilash
    },
    onError: (error) => {
      console.error(
        "Tranzaktsiyalarni o'chirishda xatolik:",
        error.response?.data
      );
    },
  });
};

// Balansni olish
export const useBalance = () => {
  return useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const { data } = await instance.get("/balance");
      return data; // Backenddan balans ma'lumotlari
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
};

// Balansni sozlash (Adjust Balance)
export const useAdjustBalance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (adjustmentData) => {
      const { data } = await instance.post("/balance/adjust", adjustmentData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["balance"]); // Balansni yangilash
    },
    onError: (error) => {
      console.error("Balansni sozlashda xatolik:", error.response?.data);
    },
  });
};
