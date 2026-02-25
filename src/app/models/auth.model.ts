export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  name: string;
  token: string;
  refresh: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
}