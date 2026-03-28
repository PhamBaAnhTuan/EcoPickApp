import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/api/queryKeys';
import {
  conversationService,
  conversationMemberService,
  messageService,
  pointLogService,
  type SendMessagePayload,
  type AddMemberPayload,
} from '@/api/services/chatService';

// ============================================================
// Chat Queries
// ============================================================

/** GET /api/chat/conversations/ */
export const useConversations = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKeys.chat.conversations.list(filters),
    queryFn: () => conversationService.getAll(filters),
  });
};

/** GET /api/chat/conversations/{id}/ */
export const useConversation = (id: string) => {
  return useQuery({
    queryKey: queryKeys.chat.conversations.detail(id),
    queryFn: () => conversationService.getById(id),
    enabled: !!id,
  });
};

/** GET /api/chat/conversation-members/ */
export const useConversationMembers = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKeys.chat.members.list(filters),
    queryFn: () => conversationMemberService.getAll(filters),
  });
};

/** GET /api/chat/messages/ */
export const useChatMessages = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKeys.chat.messages.list(filters),
    queryFn: () => messageService.getAll(filters),
    staleTime: 0,
  });
};

/** GET /api/chat/point-logs/ */
export const usePointLogs = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKeys.chat.pointLogs.list(filters),
    queryFn: () => pointLogService.getAll(filters),
  });
};

// ============================================================
// Chat Mutations
// ============================================================

/** POST /api/chat/conversations/ */
export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload?: Record<string, unknown>) => conversationService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.conversations.lists() });
    },
  });
};

/** DELETE /api/chat/conversations/{id}/ */
export const useDeleteConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => conversationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.conversations.lists() });
    },
  });
};

/** POST /api/chat/conversation-members/ – Thêm member */
export const useAddConversationMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddMemberPayload) => conversationMemberService.add(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.members.lists() });
    },
  });
};

/** DELETE /api/chat/conversation-members/{id}/ – Xóa member */
export const useRemoveConversationMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => conversationMemberService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.members.lists() });
    },
  });
};

/** POST /api/chat/messages/ – Gửi tin nhắn */
export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SendMessagePayload) => messageService.send(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.messages.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.conversations.lists() });
    },
  });
};

/** DELETE /api/chat/messages/{id}/ */
export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => messageService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.messages.lists() });
    },
  });
};
