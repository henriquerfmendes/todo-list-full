import { AuthResponse, LoginCredentials } from "../types/authTypes";

class AuthService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    requiresAuth: boolean = false
  ): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {}),
    };

    const API_URL =
      import.meta.env.MODE === "production"
        ? import.meta.env.VITE_API_URL_PRD
        : import.meta.env.VITE_API_URL_DEV;

    if (requiresAuth) {
      const session = this.getSession();
      if (!session) {
        throw new Error("No session found");
      }
      headers["Authorization"] = `Bearer ${session.access_token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        message: data.error,
        code: data.code,
      };
    }

    return data;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async register(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async logout(): Promise<void> {
    return this.request(
      "/auth/logout",
      {
        method: "POST",
      },
      true
    );
  }

  async getCurrentUser(): Promise<AuthResponse> {
    return this.request<AuthResponse>("/user", {}, true);
  }

  setSession(session: AuthResponse["session"] | null) {
    if (session) {
      localStorage.setItem("session", JSON.stringify(session));
    } else {
      localStorage.removeItem("session");
    }
  }

  getSession(): AuthResponse["session"] | null {
    const session = localStorage.getItem("session");
    return session ? JSON.parse(session) : null;
  }

  isTokenExpired(): boolean {
    const session = this.getSession();
    if (!session) return true;

    return Date.now() >= (session.expires_at - 5 * 60) * 1000;
  }
}

export const authService = new AuthService();
