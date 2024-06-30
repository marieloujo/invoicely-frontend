import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@app/shared/services/token.service';
import { Router } from 'express';
import { catchError, throwError } from 'rxjs';

export const unauthenticatedErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        tokenService.deleteToken();
        router.navigate(['/auth/login']);
      }
      return throwError(() => error);
    })
  );
};
