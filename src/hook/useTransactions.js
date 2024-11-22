import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance"; // Axios konfiguratsiyasi uchun fayl

// Tranzaktsiyalarni olish
export const useTransactions = (filters) => {
  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: async () => {
      const params = new URLSearchParams(
        Object.entries(filters).reduce((acc, [key, value]) => {
          if (value !== null && value !== undefined) {
            acc[key] = value;
          }
          return acc;
        }, {})
      ).toString();

      const response = await instance.get(`/transactions?${params}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
};

// Tranzaktsiya qo'shish
export const useAddTransaction = () => {
  return useMutation({
    mutationFn: async (transactionData) => {
      const response = await instance.post(
        "/transactions/add",
        transactionData
      );
      return response.data;
    },
  });
};
