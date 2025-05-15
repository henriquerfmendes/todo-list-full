export interface User {
  id: string;
  email?: string;
  role?: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export interface AuthResponse {
  user: User;
  session: Session;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: AuthError | null;
  isAuthenticated: boolean;
} 
