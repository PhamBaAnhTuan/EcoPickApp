import { z } from "zod";

// ============================================================
// Auth Validation Schemas – Zod
// ============================================================

/**
 * Login Schema
 * - Email: required, valid email format
 * - Password: required, min 6 chars
 */
export const loginSchema = z.object({
	email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
	// password: z.string().min(1, "Vui lòng nhập mật khẩu").min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
	password: z.string().min(1, "Vui lòng nhập mật khẩu").min(3, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Register Schema
 * - Email: required, valid email format
 * - Password: required, min 6, cần có chữ hoa + số
 * - Confirm password: phải khớp với password
 * - Fullname: optional nhưng nếu nhập thì >= 2 ký tự
 */
export const registerSchema = z
	.object({
		email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
		password: z.string().min(1, "Vui lòng nhập mật khẩu").min(3, "Mật khẩu phải có ít nhất 3 ký tự"),
		// .regex(/[A-Z]/, "Cần có ít nhất 1 chữ hoa")
		// .regex(/[0-9]/, "Cần có ít nhất 1 số"),
		confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
		fullname: z
			.string()
			.optional()
			.refine((val) => !val || val.length >= 2, "Tên phải có ít nhất 2 ký tự"),
		role: z.enum(["user", "admin", "organizer", "moderator"]).default("user").optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Mật khẩu không khớp",
		path: ["confirmPassword"],
	});

export type RegisterFormData = z.infer<typeof registerSchema>;
