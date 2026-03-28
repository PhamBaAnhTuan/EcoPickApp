import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/api/queryKeys';
import {
  eventService,
  eventParticipantService,
  tourStopService,
  type CreateEventPayload,
  type JoinEventPayload,
} from '@/api/services/eventService';

// ============================================================
// Event Queries
// ============================================================

/** GET /api/event/events/ */
export const useEvents = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKeys.events.list(filters),
    queryFn: () => eventService.getAll(filters),
  });
};

/** GET /api/event/events/{id}/ */
export const useEvent = (id: string) => {
  return useQuery({
    queryKey: queryKeys.events.detail(id),
    queryFn: () => eventService.getById(id),
    enabled: !!id,
  });
};

/** GET /api/event/event-participants/ */
export const useEventParticipants = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKeys.events.participants.list(filters),
    queryFn: () => eventParticipantService.getAll(filters),
  });
};

/** GET /api/event/tour-stops/ */
export const useTourStops = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKeys.events.tourStops.list(filters),
    queryFn: () => tourStopService.getAll(filters),
  });
};

// ============================================================
// Event Mutations
// ============================================================

/** POST /api/event/events/ */
export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateEventPayload) => eventService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.lists() });
    },
  });
};

/** DELETE /api/event/events/{id}/ */
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => eventService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.lists() });
    },
  });
};

/** POST /api/event/event-participants/ – Tham gia event */
export const useJoinEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: JoinEventPayload) => eventParticipantService.join(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events.participants.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.events.lists() });
    },
  });
};
