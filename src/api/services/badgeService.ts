import { ENDPOINTS } from '@/api/endpoints';
import api from '@/lib/axios';

// ============================================================
// Types
// ============================================================

export interface Badge {
  id: string;
  name: string;
  description?: string;
  icon_url: string;
  category?: string; // "event", etc.
  [key: string]: unknown;
}



export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  [key: string]: unknown;
  badge: Badge
}

export interface ExchangeItem {
  id: string;
  [key: string]: unknown;
}

export interface CreateBadgePayload {
  name: string;
  description: string;
  icon_url: string;
  category: string;
}

export interface AssignBadgePayload {
  user_id: string;
  badge_id: string;
}

// ============================================================
// API Functions
// ============================================================

export const badgeService = {
  /** GET /api/badge/badges/ */
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get<Badge[]>(ENDPOINTS.BADGES.LIST, { params });
    return data;
  },

  /** GET /api/badge/badges/{id}/ */
  getById: async (id: string) => {
    const { data } = await api.get<Badge>(ENDPOINTS.BADGES.BY_ID(id));
    return data;
  },

  /** POST /api/badge/badges/ (formdata) */
  create: async (payload: CreateBadgePayload) => {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await api.post<Badge>(ENDPOINTS.BADGES.LIST, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  /** DELETE /api/badge/badges/{id}/ */
  delete: async (id: string) => {
    const { data } = await api.delete(ENDPOINTS.BADGES.BY_ID(id));
    return data;
  },
};

export const userBadgeService = {
  /** GET /api/badge/user-badges/?user_id=xxx&badge_id=xxx */
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get<UserBadge[]>(ENDPOINTS.BADGES.USER_BADGES.LIST, { params });
    return data;
  },

  /** POST /api/badge/user-badges/ (formdata) */
  assign: async (payload: AssignBadgePayload) => {
    const formData = new FormData();
    formData.append('user_id', payload.user_id);
    formData.append('badge_id', payload.badge_id);
    const { data } = await api.post<UserBadge>(ENDPOINTS.BADGES.USER_BADGES.LIST, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  /** DELETE /api/badge/user-badges/{id}/ */
  remove: async (id: string) => {
    const { data } = await api.delete(ENDPOINTS.BADGES.USER_BADGES.BY_ID(id));
    return data;
  },
};

export const exchangeItemService = {
  /** GET /api/badge/exchange-items/ */
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get<ExchangeItem[]>(ENDPOINTS.BADGES.EXCHANGE_ITEMS.LIST, { params });
    return data;
  },

  /** POST /api/badge/exchange-items/ */
  create: async (payload: Record<string, unknown>) => {
    const { data } = await api.post<ExchangeItem>(ENDPOINTS.BADGES.EXCHANGE_ITEMS.LIST, payload);
    return data;
  },

  /** DELETE /api/badge/exchange-items/{id}/ */
  delete: async (id: string) => {
    const { data } = await api.delete(ENDPOINTS.BADGES.EXCHANGE_ITEMS.BY_ID(id));
    return data;
  },
};
