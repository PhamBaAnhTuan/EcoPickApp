import api from '@/lib/axios';
import { ENDPOINTS } from '@/api/endpoints';

// ============================================================
// Types
// ============================================================

export interface Post {
  id: string;
  content?: string;
  caption?: string;
  author_id?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

export interface PostComment {
  id: string;
  content?: string;
  post_id?: string;
  user_id?: string;
  created_at?: string;
  [key: string]: unknown;
}

export interface PostLike {
  id: string;
  post_id?: string;
  user_id?: string;
  created_at?: string;
  [key: string]: unknown;
}

export interface PostMedia {
  id: string;
  post_id?: string;
  media_url?: string;
  media_type?: string;
  [key: string]: unknown;
}

export interface CreatePostPayload {
  [key: string]: unknown;
}

export interface CreateCommentPayload {
  [key: string]: unknown;
}

export interface CreateLikePayload {
  [key: string]: unknown;
}

// ============================================================
// API Functions
// ============================================================

export const postService = {
  /** GET /api/post/posts/ */
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get<Post[]>(ENDPOINTS.POSTS.LIST, { params });
    return data;
  },

  /** GET /api/post/posts/{id}/ */
  getById: async (id: string) => {
    const { data } = await api.get<Post>(ENDPOINTS.POSTS.BY_ID(id));
    return data;
  },

  /** POST /api/post/posts/ */
  create: async (payload: CreatePostPayload) => {
    const { data } = await api.post<Post>(ENDPOINTS.POSTS.LIST, payload);
    return data;
  },

  /** DELETE /api/post/posts/{id}/ */
  delete: async (id: string) => {
    const { data } = await api.delete(ENDPOINTS.POSTS.BY_ID(id));
    return data;
  },

  /** PATCH /api/post/posts/{id}/ */
  update: async (id: string, payload: Partial<Post>) => {
    const { data } = await api.patch<Post>(ENDPOINTS.POSTS.BY_ID(id), payload);
    return data;
  },
};

export const commentService = {
  /** GET /api/post/comments/ */
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get<PostComment[]>(ENDPOINTS.POSTS.COMMENTS.LIST, { params });
    return data;
  },

  /** POST /api/post/comments/ */
  create: async (payload: CreateCommentPayload) => {
    const { data } = await api.post<PostComment>(ENDPOINTS.POSTS.COMMENTS.LIST, payload);
    return data;
  },

  /** DELETE /api/post/comments/{id}/ */
  delete: async (id: string) => {
    const { data } = await api.delete(ENDPOINTS.POSTS.COMMENTS.BY_ID(id));
    return data;
  },
};

export const likeService = {
  /** GET /api/post/likes/ */
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get<PostLike[]>(ENDPOINTS.POSTS.LIKES.LIST, { params });
    return data;
  },

  /** POST /api/post/likes/ */
  create: async (payload: CreateLikePayload) => {
    const { data } = await api.post<PostLike>(ENDPOINTS.POSTS.LIKES.LIST, payload);
    return data;
  },

  /** DELETE /api/post/likes/{id}/ */
  delete: async (id: string) => {
    const { data } = await api.delete(ENDPOINTS.POSTS.LIKES.BY_ID(id));
    return data;
  },
};

export const postMediaService = {
  /** GET /api/post/post-media/ */
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get<PostMedia[]>(ENDPOINTS.POSTS.MEDIA.LIST, { params });
    return data;
  },

  /** POST /api/post/post-media/ */
  create: async (payload: FormData) => {
    const { data } = await api.post<PostMedia>(ENDPOINTS.POSTS.MEDIA.LIST, payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  /** DELETE /api/post/post-media/{id}/ */
  delete: async (id: string) => {
    const { data } = await api.delete(ENDPOINTS.POSTS.MEDIA.BY_ID(id));
    return data;
  },
};
