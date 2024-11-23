import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

// Balansni olish
export const useBalance = () => {
  return useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const { data } = await instance.get("/balance");
      return data; // Backenddan qaytgan balans
    },
    staleTime: 1000 * 60 * 5, // 5 daqiqa
  });
};

// Balansni sozlash (adjust)
export const useAdjustBalance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (adjustment) => {
      const { data } = await instance.post("/balance/adjust", adjustment);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["balance"]);
    },
  });
};

// Balansni to'g'rilash yoki yangilash
export const useUpdateBalance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newBalance) => {
      const { data } = await instance.post("/balance/update", newBalance);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["balance"]);
    },
  });
};
