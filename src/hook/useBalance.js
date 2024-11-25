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
    onError: (error) => {
      console.error("Failed to fetch balance:", error);
    },
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
    onError: (error) => {
      console.error("Failed to adjust balance:", error);
    },
    // Optimistic Update (Optional): Assume the balance is updated
    onMutate: async (adjustment) => {
      await queryClient.cancelQueries(["balance"]);
      const previousBalance = queryClient.getQueryData(["balance"]);

      // Optimistically update the balance here
      queryClient.setQueryData(["balance"], (oldData) => ({
        ...oldData,
        balance: oldData.balance + adjustment.amount,
      }));

      return { previousBalance };
    },
    onError: (error, adjustment, context) => {
      console.error("Failed to adjust balance:", error);
      queryClient.setQueryData(["balance"], context.previousBalance); // Rollback to previous balance
    },
    onSettled: () => {
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
    onError: (error) => {
      console.error("Failed to update balance:", error);
    },
    // Optimistic Update (Optional)
    onMutate: async (newBalance) => {
      await queryClient.cancelQueries(["balance"]);
      const previousBalance = queryClient.getQueryData(["balance"]);

      // Optimistically update the balance
      queryClient.setQueryData(["balance"], (oldData) => ({
        ...oldData,
        balance: newBalance.amount,
      }));

      return { previousBalance };
    },
    onError: (error, newBalance, context) => {
      console.error("Failed to update balance:", error);
      queryClient.setQueryData(["balance"], context.previousBalance); // Rollback to previous balance
    },
    onSettled: () => {
      queryClient.invalidateQueries(["balance"]);
    },
  });
};
