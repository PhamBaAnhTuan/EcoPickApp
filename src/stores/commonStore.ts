import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CommonState {
  rememberedEmail: string | null;
  rememberedPassword: string | null;
  setRememberedCredentials: (email?: string, password?: string) => void;
  clearRememberedCredentials: () => void;
}

// ============================================================
// Common Store – Lưu trữ các state chung tiện ích (e.g. remember me)
// ============================================================
export const useCommonStore = create<CommonState>()(
  persist(
    (set) => ({
      rememberedEmail: null,
      rememberedPassword: null,
      setRememberedCredentials: (email, password) => set({ rememberedEmail: email, rememberedPassword: password }),
      clearRememberedCredentials: () => set({ rememberedEmail: null, rememberedPassword: null }),
    }),
    {
      name: 'common-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
