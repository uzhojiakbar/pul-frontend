// hooks/useBalance.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

// Balansni olish
export const useBalance = () => {
  return useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const response = await instance.get("/balance");
      return response.data; // Balans ma'lumotlari
    },
    staleTime: 1000 * 60 * 5, // 5 daqiqa keshlash
  });
};

// Balansni yangilash
export const useUpdateBalance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedBalance) => {
      const response = await instance.post("/balance", updatedBalance);
      return response.data; // Yangilangan balans
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["balance"]); // Balansni yangilash
    },
  });
};
