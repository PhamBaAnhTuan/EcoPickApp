import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';

// ============================================================
// Axios Instance - Cấu hình chung cho tất cả API calls
// ============================================================

// export const API_BASE_URL = 'https://ecopickapi.onrender.com';
export const API_BASE_URL = 'http://54.66.51.43:5500';
// export const API_BASE_URL = "http://192.168.20.138:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30s - Render free tier có thể cold start chậm
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ============================================================
// Request Interceptor - Tự động gắn token vào mỗi request
// ============================================================

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ============================================================
// Response Interceptor - Xử lý lỗi chung (401, 403, 500,...)
// ============================================================

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          // Token hết hạn hoặc không hợp lệ -> logout
          useAuthStore.getState().logout();
          break;
        case 403:
          console.warn('[API] Forbidden: Không có quyền truy cập');
          break;
        case 500:
          console.error('[API] Server Error:', error.response.data);
          break;
        default:
          break;
      }
    } else if (error.request) {
      // Request đã gửi nhưng không nhận được response (network error)
      console.error('[API] Network Error: Không thể kết nối đến server');
    }

    return Promise.reject(error);
  },
);

export default api;
