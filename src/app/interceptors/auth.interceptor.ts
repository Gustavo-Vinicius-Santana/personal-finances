import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError, Observable } from 'rxjs';

import { Router } from '@angular/router';


const PUBLIC_ROUTES = [
  '/user/login',
  '/user/register',
  '/user/refresh',
  '/user/forgot-password',
  '/user/reset-password'
];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (isPublicRoute(req.url)) {
    return next(req);
  }

  const authReq = addToken(req, authService.getToken());

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }

      return handle401(req, next, authService, router);
    })
  );
};



function isPublicRoute(url: string): boolean {
  return PUBLIC_ROUTES.some(route => url.includes(route));
}

function addToken(
  req: HttpRequest<unknown>,
  token: string | null
): HttpRequest<unknown> {
  if (!token) return req;

  return req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
}

function handle401(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  router: Router
): Observable<HttpEvent<unknown>> {
  return authService.refreshToken().pipe(
    switchMap((response: any) => {
      const newToken = response.token;
      authService.setToken(newToken);

      const newRequest = addToken(req, newToken);
      return next(newRequest);
    }),
    catchError(err => {
      authService.logout();
      router.navigate(['/']); 
      return throwError(() => err);
    })
  );
}