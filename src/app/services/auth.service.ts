import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  UserResponse,
  UpdatePasswordRequest,
  UpdateUserRequest,
  UpdateEmailRequest
} from '../models/auth.model';
import { LoadingService } from './loading.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = `${environment.apiUrl}/user`;
  private tokenKey = 'auth_token';
  private refreshKey = 'refresh_token';

  private userSubject = new BehaviorSubject<UserResponse | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  // =====================
  // TOKEN STORAGE
  // =====================

  private saveTokens(response: AuthResponse, remember: boolean) {
    localStorage.setItem(this.tokenKey, response.token);

    if (remember) {
      localStorage.setItem(this.refreshKey, response.refresh);
    } else {
      localStorage.removeItem(this.refreshKey);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
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

  login(data: LoginRequest, remember: boolean) {

    this.loadingService.show();

    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, data)
      .pipe(
        tap(response => {
          this.saveTokens(response, remember)
          this.userSubject.next({name: response.name, email: '', id: 0});
        }),
        finalize(() => this.loadingService.hide())
      );
  }

  register(data: RegisterRequest) {

    this.loadingService.show();

    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, data)
      .pipe(
        tap(response =>{ 
          this.saveTokens(response, false)
          this.userSubject.next({name: response.name, email: '', id: 0});
        }),
        finalize(() => this.loadingService.hide())
      );
  }

  getCurrentUser() {
    return this.http.get<UserResponse>(`${this.apiUrl}/me`)
    .pipe(
      tap(user => this.userSubject.next(user))
    );
  }

  updateUser(data: UpdateUserRequest) {

    this.loadingService.show();

    return this.http
      .put<UserResponse>(`${this.apiUrl}/update`, data)
      .pipe(
        tap(updatedUser => this.userSubject.next(updatedUser)),
        finalize(() => this.loadingService.hide())
      );
  }

  deleteUser() {

    this.loadingService.show();

    return this.http
      .delete(`${this.apiUrl}/delete`)
      .pipe(
        finalize(() => this.loadingService.hide())
      );
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(data: UpdatePasswordRequest) {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }

  refreshToken() {
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, {
      refreshToken: this.getRefreshToken()
    }).pipe(
      tap(response => {
        const hasRefresh = !!this.getRefreshToken();
        this.saveTokens(response, hasRefresh);
      })
    );
  }

  changeEmail(data: UpdateEmailRequest) {
    return this.http.post(`${this.apiUrl}/change-email`, data);
  }
}