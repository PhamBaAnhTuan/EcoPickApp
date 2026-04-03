// ============================================================
// API Endpoints – Mapping 1:1 với Postman Collection
// Base: https://ecopickapi.onrender.com
// ============================================================

export const ENDPOINTS = {
	// ── Auth / Users ───────────────────────────────────────────
	USERS: {
		SIGN_IN: "/api/users/signin/",
		SIGN_UP: "/api/users/signup/",
		USER_INFO: "/api/users/userinfo/",
		LIST: "/api/users/",
		BY_ID: (id: string) => `/api/users/${id}/`,
	},

	// ── Roles ──────────────────────────────────────────────────
	ROLES: {
		LIST: "/api/roles/",
		BY_ID: (id: string) => `/api/roles/${id}/`,
	},

	// ── Events ─────────────────────────────────────────────────
	EVENTS: {
		LIST: "/api/event/events/",
		BY_ID: (id: string) => `/api/event/events/${id}/`,
		PARTICIPANTS: {
			LIST: "/api/event/event-participants/",
			BY_ID: (id: string) => `/api/event/event-participants/${id}/`,
		},
		TOUR_STOPS: {
			LIST: "/api/event/tour-stops/",
			BY_ID: (id: string) => `/api/event/tour-stops/${id}/`,
		},
	},

	// ── Posts ───────────────────────────────────────────────────
	POSTS: {
		LIST: "/api/post/posts/",
		BY_ID: (id: string) => `/api/post/posts/${id}/`,
		COMMENTS: {
			LIST: "/api/post/comments/",
			BY_ID: (id: string) => `/api/post/comments/${id}/`,
		},
		LIKES: {
			LIST: "/api/post/likes/",
			BY_ID: (id: string) => `/api/post/likes/${id}/`,
		},
		MEDIA: {
			LIST: "/api/post/post-media/",
			BY_ID: (id: string) => `/api/post/post-media/${id}/`,
		},
	},

	// ── Reports ────────────────────────────────────────────────
	REPORTS: {
		LIST: "/api/report/reports/",
		BY_ID: (id: string) => `/api/report/reports/${id}/`,
		IMAGES: {
			LIST: "/api/report/report-images/",
			BY_ID: (id: string) => `/api/report/report-images/${id}/`,
		},
	},

	// ── Chat ───────────────────────────────────────────────────
	CHAT: {
		CONVERSATIONS: {
			LIST: "/api/chat/conversations/",
			BY_ID: (id: string) => `/api/chat/conversations/${id}/`,
		},
		MEMBERS: {
			LIST: "/api/chat/conversation-members/",
			BY_ID: (id: string) => `/api/chat/conversation-members/${id}/`,
		},
		MESSAGES: {
			LIST: "/api/chat/messages/",
			BY_ID: (id: string) => `/api/chat/messages/${id}/`,
		},
		POINT_LOGS: {
			LIST: "/api/chat/point-logs/",
			BY_ID: (id: string) => `/api/chat/point-logs/${id}/`,
		},
	},

	// ── Badges ─────────────────────────────────────────────────
	BADGES: {
		LIST: "/api/badge/badges/",
		BY_ID: (id: string) => `/api/badge/badges/${id}/`,
		USER_BADGES: {
			LIST: "/api/badge/user-badges/",
			BY_ID: (id: string) => `/api/badge/user-badges/${id}/`,
		},
		EXCHANGE_ITEMS: {
			LIST: "/api/badge/exchange-items/",
			BY_ID: (id: string) => `/api/badge/exchange-items/${id}/`,
		},
	},
} as const;
