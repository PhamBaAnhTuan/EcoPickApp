import api from '@/lib/axios';
import { ENDPOINTS } from '@/api/endpoints';

// ============================================================
// Types
// ============================================================

export interface Conversation {
  id: string;
  [key: string]: unknown;
}

export interface ConversationMember {
  id: string;
  conversation_id?: string;
  user_id?: string;
  [key: string]: unknown;
}

export interface ChatMessage {
  id: string;
  content?: string;
  sender_id?: string;
  conversation_id?: string;
  created_at?: string;
  [key: string]: unknown;
}

export interface PointLog {
  id: string;
  [key: string]: unknown;
}

export interface SendMessagePayload {
  content: string;
  conversation_id?: string;
  [key: string]: unknown;
}

export interface AddMemberPayload {
  conversation_id?: string;
  user_id?: string;
  [key: string]: unknown;
}

// ============================================================
// API Functions
// ============================================================

export const conversationService = {
  /** GET /api/chat/conversations/ */
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get<Conversation[]>(ENDPOINTS.CHAT.CONVERSATIONS.LIST, { params });
    return data;
  },

  /** GET /api/chat/conversations/{id}/ */
  getById: async (id: string) => {
    const { data } = await api.get<Conversation>(ENDPOINTS.CHAT.CONVERSATIONS.BY_ID(id));
    return data;
  },

  /** POST /api/chat/conversations/ */
  create: async (payload?: Record<string, unknown>) => {
    const { data } = await api.post<Conversation>(ENDPOINTS.CHAT.CONVERSATIONS.LIST, payload);
    return data;
  },

  /** DELETE /api/chat/conversations/{id}/ */
  delete: async (id: string) => {
    const { data } = await api.delete(ENDPOINTS.CHAT.CONVERSATIONS.BY_ID(id));
    return data;
  },

  /** PATCH /api/chat/conversations/{id}/ */
  update: async (id: string, payload: Partial<Conversation>) => {
    const { data } = await api.patch<Conversation>(ENDPOINTS.CHAT.CONVERSATIONS.BY_ID(id), payload);
    return data;
  },
};

export const conversationMemberService = {
  /** GET /api/chat/conversation-members/ */
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get<ConversationMember[]>(ENDPOINTS.CHAT.MEMBERS.LIST, { params });
    return data;
  },

  /** POST /api/chat/conversation-members/ */
  add: async (payload: AddMemberPayload) => {
    const { data } = await api.post<ConversationMember>(ENDPOINTS.CHAT.MEMBERS.LIST, payload);
    return data;
  },

  /** DELETE /api/chat/conversation-members/{id}/ */
  remove: async (id: string) => {
    const { data } = await api.delete(ENDPOINTS.CHAT.MEMBERS.BY_ID(id));
    return data;
  },
};

export const messageService = {
  /** GET /api/chat/messages/ */
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get<ChatMessage[]>(ENDPOINTS.CHAT.MESSAGES.LIST, { params });
    return data;
  },

  /** POST /api/chat/messages/ */
  send: async (payload: SendMessagePayload) => {
    const { data } = await api.post<ChatMessage>(ENDPOINTS.CHAT.MESSAGES.LIST, payload);
    return data;
  },

  /** DELETE /api/chat/messages/{id}/ */
  delete: async (id: string) => {
    const { data } = await api.delete(ENDPOINTS.CHAT.MESSAGES.BY_ID(id));
    return data;
  },
};

export const pointLogService = {
  /** GET /api/chat/point-logs/ */
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get<PointLog[]>(ENDPOINTS.CHAT.POINT_LOGS.LIST, { params });
    return data;
  },

  /** POST /api/chat/point-logs/ */
  create: async (payload: Record<string, unknown>) => {
    const { data } = await api.post<PointLog>(ENDPOINTS.CHAT.POINT_LOGS.LIST, payload);
    return data;
  },
};
