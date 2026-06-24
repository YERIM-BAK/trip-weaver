import { supabase } from "@/lib/supabase";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name?: string;
  profileImage?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  error: string | null;
  login: (loginForm: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: () => Promise<void>;
  kakaoLogin: () => Promise<void>;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  _hasHydrated: false,
  setHasHydrated: (state) => set({ _hasHydrated: state }),
  setUser: (user) => set({ user }),

  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      set({ user: { id: data.user.id, email: data.user.email! } });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "로그인에 실패했어요";
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },

  googleLogin: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) throw error;
  },

  kakaoLogin: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) throw error;
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, error: null });
  },
}));
