import { useMutation } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

// Foydalanuvchini ro'yxatdan o'tkazish uchun Hook
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (newUser) => {
      const response = await instance.post("/auth/register", newUser);
      return response.data;
    },
  });
};
