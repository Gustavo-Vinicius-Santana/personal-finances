import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../enviroments/enviroment.development';
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  UserResponse
} from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = `${environment.apiUrl}/user`;
  private tokenKey = 'auth_token';
  private refreshKey = 'refresh_token';

  constructor(private http: HttpClient) {}

  // =====================
  // TOKEN STORAGE
  // =====================

  private saveTokens(response: AuthResponse) {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.refreshKey, response.refresh);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // =====================
  // AUTH REQUESTS
  // =====================

  login(data: LoginRequest) {
    console.log('Login data:', data);
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, data)
      .pipe(tap(response => this.saveTokens(response)));
  }

  register(data: RegisterRequest) {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, data)
      .pipe(tap(response => this.saveTokens(response)));
  }

  getCurrentUser() {
    return this.http.get<UserResponse>(`${this.apiUrl}/me`);
  }

  updateUser(data: any) {
    return this.http.put<UserResponse>(`${this.apiUrl}/update`, data);
  }

  deleteUser() {
    return this.http.delete(`${this.apiUrl}/delete`);
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(data: any) {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }

  refreshToken() {
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, {
      refreshToken: this.getRefreshToken()
    }).pipe(tap(response => this.saveTokens(response)));
  }
}