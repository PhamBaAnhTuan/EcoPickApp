import { z } from "zod";

// ============================================================
// Auth Validation Schemas – Zod
// ============================================================

/**
 * Profile Schema
 * - Email: required, valid email format
 * - Password: required, min 6 chars
 */
export const profileSchema = z.object({
	fullname: z.string().min(1, "Vui lòng nhập họ tên").min(2, "Họ tên phải có ít nhất 2 ký tự"),
	address: z.string().optional(),
	dateOfBirth: z.string().optional(),
	website: z.string().optional(),
	bio: z.string().max(200, "Bio không được vượt quá 200 ký tự").optional(),
	phone: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;