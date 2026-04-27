import { ENDPOINTS } from "@/api/endpoints";
import api from "@/lib/axios";

// ============================================================
// Types – Dựa trên API response thực tế
// ============================================================

/** POST /api/users/signin/ response */
export interface SignInResponse {
	access_token: string;
	expires_in: number;
	token_type: string;
	scope: string;
	refresh_token: string;
}

export interface SignInPayload {
	email: string;
	password: string;
}

export interface SignUpPayload {
	email: string;
	password: string;
}

/** GET /api/users/ – danh sách users */
export interface UserListItem {
	id: string;
	fullname: string | null;
	email: string;
	phone_number: string | null;
	address: string | null;
	date_of_birth: string | null;
	avatar: string | null;
	role: {
		id: string;
		name: string;
	};
}

/** GET /api/users/userinfo/ – thông tin chi tiết user hiện tại */
export interface UserInfo {
	id: string;
	role: {
		id: string;
		name: string;
	};
	fullname: string | null;
	email: string;
	phone_number: string | null;
	address: string | null;
	date_of_birth: string | null;
	avatar: string | null;
	bio: string | null;
	level: number;
	eco_points: number;
	total_reports: number;
	total_events: number;
	total_trees: number;
	followers_count: number;
	following_count: number;
	is_verified: boolean;
	is_staff: boolean;
}

export interface UpdateUserPayload {
	fullname?: string;
	phone_number?: string;
	address?: string;
	date_of_birth?: string;
	avatar?: { uri: string; name: string; type: string } | string;
	bio?: string;
	eco_points?: number;
	level?: number;
	total_reports?: number;
}

// ============================================================
// API Functions
// ============================================================

export const authService = {
	/** Đăng nhập – POST /api/users/signin/ */
	signIn: async (payload: SignInPayload) => {
		const { data } = await api.post<SignInResponse>(ENDPOINTS.USERS.SIGN_IN, payload);
		return data;
	},

	/** Đăng ký – POST /api/users/signup/ (formdata) */
	signUp: async (payload: SignUpPayload) => {
		const formData = new FormData();
		formData.append("email", payload.email);
		formData.append("password", payload.password);
		const { data } = await api.post(ENDPOINTS.USERS.SIGN_UP, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return data;
	},
};

export const userService = {
	/** Lấy danh sách users – GET /api/users/ */
	getAll: async (params?: Record<string, unknown>) => {
		const { data } = await api.get<UserListItem[]>(ENDPOINTS.USERS.LIST, { params });
		return data;
	},

	/** Lấy thông tin user hiện tại – GET /api/users/userinfo/ */
	getUserInfo: async () => {
		const { data } = await api.get<UserInfo>(ENDPOINTS.USERS.USER_INFO);
		return data;
	},

	/** Cập nhật user – PUT /api/users/{id}/ (multipart/form-data) */
	update: async (id: string, payload: UpdateUserPayload) => {
		const formData = new FormData();

		// Append các text field nếu có giá trị
		if (payload.fullname !== undefined) formData.append('fullname', payload.fullname);
		if (payload.phone_number !== undefined) formData.append('phone_number', payload.phone_number);
		if (payload.address !== undefined) formData.append('address', payload.address);
		if (payload.date_of_birth !== undefined) formData.append('date_of_birth', payload.date_of_birth);
		if (payload.bio !== undefined) formData.append('bio', payload.bio);
		if (payload.eco_points !== undefined) formData.append('eco_points', String(payload.eco_points));
		if (payload.level !== undefined) formData.append('level', String(payload.level));
		if (payload.total_reports !== undefined) formData.append('total_reports', String(payload.total_reports));

		// Avatar: nếu là file object thì append trực tiếp, nếu là string URL thì append string
		if (payload.avatar !== undefined) {
			if (typeof payload.avatar === 'string') {
				formData.append('avatar', payload.avatar);
			} else {
				formData.append('avatar', payload.avatar as any);
			}
		}

		const { data } = await api.put<UserListItem>(ENDPOINTS.USERS.BY_ID(id), formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		return data;
	},

	/** Xóa user – DELETE /api/users/{id}/ */
	delete: async (id: string) => {
		const { data } = await api.delete(ENDPOINTS.USERS.BY_ID(id));
		return data;
	},
};
