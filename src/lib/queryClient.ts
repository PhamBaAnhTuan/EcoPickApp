import { QueryClient } from '@tanstack/react-query';

// ============================================================
// React Query Client - Cấu hình mặc định cho mobile
// ============================================================

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Dữ liệu được coi là "fresh" trong 5 phút
      staleTime: 5 * 60 * 1000,

      // Cache sẽ bị xóa sau 30 phút không sử dụng
      gcTime: 30 * 60 * 1000,

      // Retry 2 lần khi request fail
      retry: 2,

      // Tự động refetch khi app quay lại foreground
      refetchOnWindowFocus: false, // Tắt trên mobile vì hành vi khác web

      // Không refetch khi reconnect (để tránh spam request)
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry 1 lần cho mutation
      retry: 1,
    },
  },
});
