import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AuthState, LoginCredentials } from "../types/authTypes";
import { authService } from "../services/authService";

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

const initialState: AuthState = {
  user: null,
  session: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        login: async (credentials) => {
          set({ isLoading: true, error: null });
          try {
            const response = await authService.login(credentials);
            authService.setSession(response.session);
            set({
              user: response.user,
              session: response.session,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error) {
            set({
              error: error as { message: string; code?: string },
              isLoading: false,
            });
            throw error;
          }
        },

        register: async (credentials) => {
          set({ isLoading: true, error: null });
          try {
            const response = await authService.register(credentials);
            authService.setSession(response.session);
            set({
              user: response.user,
              session: response.session,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error) {
            set({
              error: error as { message: string; code?: string },
              isLoading: false,
            });
            throw error;
          }
        },

        logout: async () => {
          set({ isLoading: true, error: null });
          try {
            await authService.logout();
            authService.setSession(null);
            set(initialState);
          } catch (error) {
            set({
              error: error as { message: string; code?: string },
              isLoading: false,
            });
            throw error;
          }
        },

        checkAuth: async () => {
          const session = authService.getSession();
          if (!session || authService.isTokenExpired()) {
            set(initialState);
            return;
          }

          if (session && !authService.isTokenExpired()) {
            set({
              session,
              isAuthenticated: true,
              isLoading: false,
            });
            return;
          }

          set({ isLoading: true, error: null });
          try {
            const response = await authService.getCurrentUser();
            set({
              user: response.user,
              session: response.session,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error) {
            console.log("error: ", error);
            authService.setSession(null);
            set(initialState);
          }
        },

        clearError: () => set({ error: null }),
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          session: state.session,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);
