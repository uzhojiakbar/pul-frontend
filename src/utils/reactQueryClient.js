import { QueryClient } from "@tanstack/react-query";

// Global query client yaratish
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // So'rovlar uchun default sozlamalar
      staleTime: 1000 * 60 * 5, // 5 daqiqa davomida saqlash
      cacheTime: 1000 * 60 * 60 * 24, // 1 kun davomida cache saqlash
      retry: 2, // 2 marta qayta urinish
      refetchOnWindowFocus: false, // Foydalanuvchi oynaga qaytganida so'rovni qayta yubormaslik
      refetchInterval: false, // Intervalni o'chirish
      onError: (error) => {
        // So'rovda xatolik yuz berishi holatida xatolikni qayd etish
        console.error("So'rovda xatolik:", error);
      },
    },
  },
});
