import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/api/queryKeys';
import {
  badgeService,
  userBadgeService,
  exchangeItemService,
  type CreateBadgePayload,
  type AssignBadgePayload,
} from '@/api/services/badgeService';

// ============================================================
// Badge Queries
// ============================================================

/** GET /api/badge/badges/ */
export const useBadges = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKeys.badges.list(filters),
    queryFn: () => badgeService.getAll(filters),
  });
};

/** GET /api/badge/badges/{id}/ */
export const useBadge = (id: string) => {
  return useQuery({
    queryKey: queryKeys.badges.detail(id),
    queryFn: () => badgeService.getById(id),
    enabled: !!id,
  });
};

/** GET /api/badge/user-badges/?user_id=xxx */
export const useUserBadges = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKeys.badges.userBadges.list(filters),
    queryFn: () => userBadgeService.getAll(filters),
    enabled: !!filters,
  });
};

/** GET /api/badge/exchange-items/ */
export const useExchangeItems = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKeys.badges.exchangeItems.list(filters),
    queryFn: () => exchangeItemService.getAll(filters),
  });
};

// ============================================================
// Badge Mutations
// ============================================================

/** POST /api/badge/badges/ */
export const useCreateBadge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBadgePayload) => badgeService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.badges.lists() });
    },
  });
};

/** DELETE /api/badge/badges/{id}/ */
export const useDeleteBadge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => badgeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.badges.lists() });
    },
  });
};

/** POST /api/badge/user-badges/ – Gán badge cho user */
export const useAssignBadge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AssignBadgePayload) => userBadgeService.assign(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.badges.userBadges.lists() });
    },
  });
};

/** DELETE /api/badge/user-badges/{id}/ – Xóa badge khỏi user */
export const useRemoveUserBadge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userBadgeService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.badges.userBadges.lists() });
    },
  });
};
