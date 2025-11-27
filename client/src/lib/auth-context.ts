import { create } from 'zustand';
import { authApi } from './api';

export interface User {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async () => {
    try {
      const response = await authApi.login();
      set({ user: response.user, isAuthenticated: true });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      const user = await authApi.me();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));

// Initialize auth check on app load
if (typeof window !== 'undefined') {
  useAuth.getState().checkAuth();
}
