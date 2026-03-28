import api from '@/lib/axios';
import { ENDPOINTS } from '@/api/endpoints';

// ============================================================
// Types – Dựa trên API response thực tế
// ============================================================

/** POST /api/users/signin/ response */
export interface SignInResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
}

/** GET /api/users/ – danh sách users */
export interface UserListItem {
  id: string;
  fullname: string | null;
  email: string;
  phone_number: string | null;
  address: string | null;
  date_of_birth: string | null;
  avatar: string | null;
  role: {
    id: string;
    name: string;
  };
}

/** GET /api/users/userinfo/ – thông tin chi tiết user hiện tại */
export interface UserInfo {
  id: string;
  role: {
    id: string;
    name: string;
  };
  fullname: string | null;
  email: string;
  phone_number: string | null;
  address: string | null;
  date_of_birth: string | null;
  avatar: string | null;
  bio: string | null;
  level: number;
  eco_points: number;
  total_reports: number;
  total_events: number;
  total_trees: number;
  followers_count: number;
  following_count: number;
  is_verified: boolean;
  is_staff: boolean;
}

export interface UpdateUserPayload {
  fullname?: string;
  phone_number?: string;
  address?: string;
  date_of_birth?: string;
  avatar?: string;
  bio?: string;
}

// ============================================================
// API Functions
// ============================================================

export const authService = {
  /** Đăng nhập – POST /api/users/signin/ */
  signIn: async (payload: SignInPayload) => {
    const { data } = await api.post<SignInResponse>(ENDPOINTS.USERS.SIGN_IN, payload);
    return data;
  },

  /** Đăng ký – POST /api/users/signup/ (formdata) */
  signUp: async (payload: SignUpPayload) => {
    const formData = new FormData();
    formData.append('email', payload.email);
    formData.append('password', payload.password);
    const { data } = await api.post(ENDPOINTS.USERS.SIGN_UP, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
};

export const userService = {
  /** Lấy danh sách users – GET /api/users/ */
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get<UserListItem[]>(ENDPOINTS.USERS.LIST, { params });
    return data;
  },

  /** Lấy thông tin user hiện tại – GET /api/users/userinfo/ */
  getUserInfo: async () => {
    const { data } = await api.get<UserInfo>(ENDPOINTS.USERS.USER_INFO);
    return data;
  },

  /** Cập nhật user – PATCH /api/users/{id}/ */
  update: async (id: string, payload: UpdateUserPayload) => {
    const { data } = await api.patch<UserListItem>(ENDPOINTS.USERS.BY_ID(id), payload);
    return data;
  },

  /** Xóa user – DELETE /api/users/{id}/ */
  delete: async (id: string) => {
    const { data } = await api.delete(ENDPOINTS.USERS.BY_ID(id));
    return data;
  },
};
