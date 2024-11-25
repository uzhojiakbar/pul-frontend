import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance"; // Correct import
import { useMemo } from "react";
import { useNavigate } from "react-router-dom"; // navigate uchun import

export const useTransactions = (filters = {}) => {
  const navigate = useNavigate(); // navigate hook'i orqali login sahifasiga yo'naltirish

  // Filters uchun memoizatsiya
  const memoizedFilters = useMemo(() => {
    return Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});
  }, [filters]);

  return useQuery({
    queryKey: ["transactions", memoizedFilters], // Memoizatsiya qilingan obyektni kalit sifatida foydalanish
    queryFn: async () => {
      try {
        const params = new URLSearchParams(memoizedFilters).toString();
        console.log(params);

        const { data } = await axiosInstance.get(`/transactions?${params}`);
        return data;
      } catch (error) {
        console.error(
          "Tranzaktsiyalarni olishda xatolik:",
          error.response?.data || error.message
        );

        // Agar 401 (Unauthorized) bo'lsa, foydalanuvchini login sahifasiga yo'naltirish

        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 daqiqa kechikish
    keepPreviousData: true, // Avvalgi ma'lumotni saqlash
    refetchOnWindowFocus: true, // Foydalanuvchi oynaga qaytganda qayta so‘rov
    refetchInterval: 10000, // Har 10 soniyada yangilanish
    retry: (failureCount, error) => {
      // Agar 401 xatolik bo'lsa, so'rovni qayta yubormaslik
      if (error.response?.status === 401) {
        return false; // 401 bo'lsa, qayta so'rov yuborilmasin
      }
      // Boshqa xatoliklar uchun default tarzda 3 marta qayta urinib ko'rish
      return failureCount < 3;
    },
  });
};

// Tranzaktsiya qo'shish
export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // navigate uchun hook

  return useMutation({
    mutationFn: async (newTransaction) => {
      try {
        const { data } = await axiosInstance.post(
          "/transactions",
          newTransaction
        );
        return data;
      } catch (error) {
        console.error(
          "Tranzaktsiya qo'shishda xatolik:",
          error.response?.data || error.message
        );

        // Agar 401 (Unauthorized) bo'lsa, foydalanuvchini login sahifasiga yo'naltirish

        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]); // Tranzaktsiyalarni yangilash
      queryClient.invalidateQueries(["balance"]); // Balansni yangilash
    },
    retry: (failureCount, error) => {
      if (error.response?.status === 401) {
        return false; // 401 bo'lsa, qayta so'rov yuborilmasin
      }
      return failureCount < 3; // Boshqa xatoliklar uchun default tarzda 3 marta qayta urinib ko'rish
    },
  });
};

// Tranzaktsiyalarni o'chirish
export const useDeleteAllTransactions = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // navigate uchun hook

  return useMutation({
    mutationFn: async () => {
      try {
        const { data } = await axiosInstance.delete("/transactions/delete-all");
        return data;
      } catch (error) {
        console.error(
          "Tranzaktsiyalarni o'chirishda xatolik:",
          error.response?.data || error.message
        );

        // Agar 401 (Unauthorized) bo'lsa, foydalanuvchini login sahifasiga yo'naltirish

        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]); // Tranzaktsiyalarni yangilash
      queryClient.invalidateQueries(["balance"]); // Balansni yangilash
    },
    retry: (failureCount, error) => {
      if (error.response?.status === 401) {
        return false; // 401 bo'lsa, qayta so'rov yuborilmasin
      }
      return failureCount < 3; // Boshqa xatoliklar uchun default tarzda 3 marta qayta urinib ko'rish
    },
  });
};

// Balansni olish
export const useBalance = () => {
  const navigate = useNavigate(); // navigate uchun hook
  return useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get("/balance");
        return data; // Backenddan balans ma'lumotlari
      } catch (error) {
        console.error(
          "Balansni olishda xatolik:",
          error.response?.data || error.message
        );

        // Agar 401 (Unauthorized) bo'lsa, foydalanuvchini login sahifasiga yo'naltirish

        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    retry: (failureCount, error) => {
      if (error.response?.status === 401) {
        return false; // 401 bo'lsa, qayta so'rov yuborilmasin
      }
      return failureCount < 3; // Boshqa xatoliklar uchun default tarzda 3 marta qayta urinib ko'rish
    },
  });
};

// Balansni sozlash (Adjust Balance)
export const useAdjustBalance = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // navigate uchun hook

  return useMutation({
    mutationFn: async (adjustmentData) => {
      try {
        const { data } = await axiosInstance.post(
          "/balance/adjust",
          adjustmentData
        );
        return data;
      } catch (error) {
        console.error(
          "Balansni sozlashda xatolik:",
          error.response?.data || error.message
        );

        // Agar 401 (Unauthorized) bo'lsa, foydalanuvchini login sahifasiga yo'naltirish

        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["balance"]); // Balansni yangilash
    },
    retry: (failureCount, error) => {
      if (error.response?.status === 401) {
        return false; // 401 bo'lsa, qayta so'rov yuborilmasin
      }
      return failureCount < 3; // Boshqa xatoliklar uchun default tarzda 3 marta qayta urinib ko'rish
    },
  });
};
