import { ENDPOINTS } from "@/api/endpoints";
import api from "@/lib/axios";

// ============================================================
// Types
// ============================================================
interface Reporter {
	id: string;
	email: string;
}
export interface Report {
	id: string;
	title?: string;
	description?: string;
	location?: string;
	latitude?: number;
	longitude?: number;
	report_img: string;
	severity?: string;
	status?: string;
	reporter: Reporter;
	created_at?: string;
	updated_at?: string;
	[key: string]: unknown;
}

export interface ReportImage {
	id: string;
	report_id?: string;
	image_url?: string;
	[key: string]: unknown;
}

// CreateReportPayload là FormData được build sẵn từ phía UI
// (không còn dùng plain object để tránh bug String(file) = "[object Object]")
export type CreateReportPayload = FormData;

// ============================================================
// API Functions
// ============================================================

export const reportService = {
	/** GET /api/report/reports/ */
	getAll: async (params?: Record<string, unknown>) => {
		const { data } = await api.get<Report[]>(ENDPOINTS.REPORTS.LIST, { params });
		return data;
	},

	/** GET /api/report/reports/{id}/ */
	getById: async (id: string) => {
		const { data } = await api.get<Report>(ENDPOINTS.REPORTS.BY_ID(id));
		return data;
	},

	/** POST /api/report/reports/ (multipart/form-data) */
	create: async (formData: CreateReportPayload) => {
		// Nhận FormData trực tiếp từ UI — không rebuild lại để giữ nguyên file field
		const { data } = await api.post<Report>(ENDPOINTS.REPORTS.LIST, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return data;
	},

	/** PATCH /api/report/reports/{id}/ */
	update: async (id: string, payload: Partial<Report>) => {
		const { data } = await api.patch<Report>(ENDPOINTS.REPORTS.BY_ID(id), payload);
		return data;
	},

	/** DELETE /api/report/reports/{id}/ */
	delete: async (id: string) => {
		const { data } = await api.delete(ENDPOINTS.REPORTS.BY_ID(id));
		return data;
	},
};

export const reportImageService = {
	/** GET /api/report-images/ */
	getAll: async (params?: Record<string, unknown>) => {
		const { data } = await api.get<ReportImage[]>(ENDPOINTS.REPORTS.IMAGES.LIST, { params });
		return data;
	},

	/** POST /api/report-images/ */
	create: async (payload: FormData) => {
		const { data } = await api.post<ReportImage>(ENDPOINTS.REPORTS.IMAGES.LIST, payload, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return data;
	},

	/** DELETE /api/report-images/{id}/ */
	delete: async (id: string) => {
		const { data } = await api.delete(ENDPOINTS.REPORTS.IMAGES.BY_ID(id));
		return data;
	},
};
