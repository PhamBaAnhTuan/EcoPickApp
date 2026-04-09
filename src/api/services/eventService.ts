import { ENDPOINTS } from "@/api/endpoints";
import api from "@/lib/axios";

// ============================================================
// Types – Dựa trên API response: GET /api/event/events/
// ============================================================

export interface Event {
	id: string;
	title: string;
	description: string;
	cover_image_url: string | null;
	type: string; // "clean up", etc.
	start_date: string; // "20/05/2026 07:00:00"
	end_date: string;
	latitude: number;
	longitude: number;
	location: string;
	address: string;
	max_paticipants: number;
	current_paticipants: number;
	equipment: string;
	difficulty: string; // "easy" | "medium" | "hard"
	eco_point_reward: number;
	status: string; // "upcoming" | "ongoing" | "completed"
	created_at: string;
	updated_at: string;
	organizer_id: string;
}

export interface CreateEventPayload {
	organizer_id: string;
	title: string;
	type: string;
	location: string;
	latitude: number | string;
	longitude: number | string;
	start_date: string;
	end_date: string;
	address?: string;
	description?: string;
	equipment?: string;
	difficulty?: string;
	cover_image_url?: string;
	max_paticipants?: number;
	current_paticipants?: number;
	eco_point_reward?: number;
	status?: string;
}

export interface EventParticipant {
	id: string;
	status: string; // "joined"
	joined_at: string;
	checked_in_at: string;
	event: string;
	user: string;
	participant: {
		id: string;
		fullname: string;
		avatar: string;
		email: string;
	}
}

export interface JoinEventPayload {
	event: string;
	user: string;
	checked_in_at?: string;
	status?: string;
}

export interface TourStop {
	id: string;
	[key: string]: unknown;
}

// ============================================================
// API Functions
// ============================================================

export const eventService = {
	/** Lấy danh sách events – GET /api/event/events/ */
	getAll: async (params?: Record<string, unknown>) => {
		const { data } = await api.get<Event[]>(ENDPOINTS.EVENTS.LIST, { params });
		return data;
	},

	/** Lấy chi tiết event – GET /api/event/events/{id}/ */
	getById: async (id: string) => {
		const { data } = await api.get<Event>(ENDPOINTS.EVENTS.BY_ID(id));
		return data;
	},

	/** Tạo event – POST /api/event/events/ (formdata) */
	create: async (payload: CreateEventPayload) => {
		const { data } = await api.post<Event>(ENDPOINTS.EVENTS.LIST, payload, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return data;
	},

	/** Xóa event – DELETE /api/event/events/{id}/ */
	delete: async (id: string) => {
		const { data } = await api.delete(ENDPOINTS.EVENTS.BY_ID(id));
		return data;
	},
};

export const eventParticipantService = {
	/** Lấy danh sách participants – GET /api/event/event-participants/ */
	getAll: async (params?: Record<string, unknown>) => {
		const { data } = await api.get<EventParticipant[]>(ENDPOINTS.EVENTS.PARTICIPANTS.LIST, { params });
		return data;
	},

	/** Tham gia event – POST /api/event/event-participants/ (formdata) */
	join: async (payload: JoinEventPayload) => {
		const formData = new FormData();
		formData.append("event", payload.event);
		formData.append("user", payload.user);
		if (payload.checked_in_at) formData.append("checked_in_at", payload.checked_in_at);
		const { data } = await api.post<EventParticipant>(ENDPOINTS.EVENTS.PARTICIPANTS.LIST, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return data;
	},

	/** Rời event – DELETE /api/event/event-participants/{id}/ */
	leave: async (id: string) => {
		const { data } = await api.delete(ENDPOINTS.EVENTS.PARTICIPANTS.BY_ID(id));
		return data;
	},
};

export const tourStopService = {
	/** Lấy danh sách tour stops – GET /api/event/tour-stops/ */
	getAll: async (params?: Record<string, unknown>) => {
		const { data } = await api.get<TourStop[]>(ENDPOINTS.EVENTS.TOUR_STOPS.LIST, { params });
		return data;
	},
};
