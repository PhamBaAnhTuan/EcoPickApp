import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/api/queryKeys';
import {
  postService,
  commentService,
  likeService,
  postMediaService,
  type CreatePostPayload,
  type CreateCommentPayload,
  type CreateLikePayload,
  type Post,
} from '@/api/services/postService';

// ============================================================
// Post Queries
// ============================================================

/** GET /api/post/posts/ */
export const usePosts = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKeys.posts.list(filters),
    queryFn: () => postService.getAll(filters),
  });
};

/** GET /api/post/posts/{id}/ */
export const usePost = (id: string) => {
  return useQuery({
    queryKey: queryKeys.posts.detail(id),
    queryFn: () => postService.getById(id),
    enabled: !!id,
  });
};

/** GET /api/post/comments/ */
export const usePostComments = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKeys.posts.comments.list(filters),
    queryFn: () => commentService.getAll(filters),
  });
};

/** GET /api/post/likes/ */
export const usePostLikes = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKeys.posts.likes.list(filters),
    queryFn: () => likeService.getAll(filters),
  });
};

/** GET /api/post/post-media/ */
export const usePostMedia = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: queryKeys.posts.media.list(filters),
    queryFn: () => postMediaService.getAll(filters),
  });
};

// ============================================================
// Post Mutations
// ============================================================

/** POST /api/post/posts/ */
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => postService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() });
    },
  });
};

/** PATCH /api/post/posts/{id}/ */
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Post> }) =>
      postService.update(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.detail(variables.id) });
    },
  });
};

/** DELETE /api/post/posts/{id}/ */
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() });
    },
  });
};

/** POST /api/post/comments/ */
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCommentPayload) => commentService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.comments.lists() });
    },
  });
};

/** DELETE /api/post/comments/{id}/ */
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => commentService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.comments.lists() });
    },
  });
};

/** POST /api/post/likes/ – Like */
export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateLikePayload) => likeService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.likes.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() });
    },
  });
};

/** POST /api/post/post-media/ */
export const useUploadPostMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => postMediaService.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.media.lists() });
    },
  });
};
