import { queryKeys } from "@/api/queryKeys";
import {
	authService,
	userService,
	type SignInPayload,
	type SignUpPayload,
	type UpdateUserPayload,
} from "@/api/services/userService";
import { useAuthStore } from "@/stores/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ============================================================
// Auth Mutations
// ============================================================

/** Đăng nhập → lưu token + fetch userInfo → lưu vào store */
export const useSignIn = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (payload: SignInPayload) => {
			// 1. Đăng nhập lấy token
			const authResponse = await authService.signIn(payload);

			// 2. Lưu token tạm để axios interceptor gắn vào header mà CHƯA kích hoạt isAuthenticated
			useAuthStore.getState().setToken(authResponse.access_token, authResponse.refresh_token);

			// 3. Fetch userInfo đầy đủ (bây giờ axios đã có token)
			const userInfo = await userService.getUserInfo();

			// 4. Kích hoạt auth chính thức (sẽ set isAuthenticated = true và trigger NavigationGuard)
			useAuthStore.getState().setAuth(authResponse.access_token, authResponse.refresh_token, userInfo);

			return { auth: authResponse, user: userInfo };
		},
		onSuccess: () => {
			// Invalidate toàn bộ cache thay vì clear hoàn toàn
			queryClient.invalidateQueries();
		},
	});
};

/** Đăng ký */
export const useSignUp = () => {
	return useMutation({
		mutationFn: (payload: SignUpPayload) => authService.signUp(payload),
	});
};

/** Đăng xuất */
export const useSignOut = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			useAuthStore.getState().logout();
		},
		onSuccess: () => {
			queryClient.clear();
		},
	});
};

// ============================================================
// User Queries
// ============================================================

/** Lấy thông tin user hiện tại – GET /api/users/userinfo/ */
export const useUserInfo = () => {
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

	return useQuery({
		queryKey: queryKeys.users.userInfo(),
		queryFn: () => userService.getUserInfo(),
		enabled: isAuthenticated,
		staleTime: 5 * 60 * 1000, // 5 phút – ngăn refetch ngầm gây mất focus input
		refetchOnWindowFocus: false,
	});
};

/** Lấy danh sách users – GET /api/users/ */
export const useUsers = (filters?: Record<string, unknown>) => {
	return useQuery({
		queryKey: queryKeys.users.list(filters),
		queryFn: () => userService.getAll(filters),
	});
};

// ============================================================
// User Mutations
// ============================================================

/** Cập nhật user – PATCH /api/users/{id}/ */
export const useUpdateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateUserPayload }) => userService.update(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
		},
		onError: (error) => {
			const errorMsg =
				error?.response?.data?.detail ||
				error?.response?.data?.error ||
				error?.message ||
				"Đăng nhập thất bại. Vui lòng kiểm tra lại.";
			console.log("UPDATE PROFILE ERROR:", errorMsg);
		},
	});
};

/** Xóa user – DELETE /api/users/{id}/ */
export const useDeleteUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => userService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
		},
	});
};
