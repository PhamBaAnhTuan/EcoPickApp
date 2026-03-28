import api from '@/lib/axios';
import { ENDPOINTS } from '@/api/endpoints';

// ============================================================
// Types – Dựa trên API response: GET /api/roles/
// ============================================================

export interface Role {
  id: string; // "admin" | "user" | "organizer" | "moderator"
  name: string;
}

export interface CreateRolePayload {
  id: string;
  name: string;
}

// ============================================================
// API Functions
// ============================================================

export const roleService = {
  /** GET /api/roles/ */
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get<Role[]>(ENDPOINTS.ROLES.LIST, { params });
    return data;
  },

  /** POST /api/roles/ */
  create: async (payload: CreateRolePayload) => {
    const { data } = await api.post<Role>(ENDPOINTS.ROLES.LIST, payload);
    return data;
  },

  /** DELETE /api/roles/{id}/ */
  delete: async (id: string) => {
    const { data } = await api.delete(ENDPOINTS.ROLES.BY_ID(id));
    return data;
  },

  /** PATCH /api/roles/ */
  update: async (payload: Partial<Role>) => {
    const formData = new FormData();
    if (payload.id) formData.append('id', payload.id);
    if (payload.name) formData.append('name', payload.name);
    const { data } = await api.patch<Role>(ENDPOINTS.ROLES.LIST, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
};
