import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Authservice } from './authservice';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Authservice);
  const router = inject(Router);
  
  const token = authService.getAuthToken();
  console.log(token,'eewr')
  
 
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.clearAuthData();
        router.navigate(['/']);
      }
      
      if (error.status === 403) {
        console.error('Access forbidden:', error.error?.message);
      }
      
      return throwError(() => error);
    })
  );
};