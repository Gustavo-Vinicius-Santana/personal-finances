import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();

  // Não envia token para login
    if (req.url.includes('/user/login') ||
        req.url.includes('/user/register') ||
        req.url.includes('/user/refresh') ||
        req.url.includes('/user/forgot-password') ||
        req.url.includes('/user/reset-password')) {
    return next(req);
    }

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(cloned);
  }

  return next(req);
};