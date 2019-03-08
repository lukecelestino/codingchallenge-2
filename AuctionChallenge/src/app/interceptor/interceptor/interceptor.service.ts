import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable, throwError  } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';

import { LoginService } from './../../login/login.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
      catchError(error => {
        if (error.status === 401 && !req.url.includes('/auth/new')) {
          return this.loginService
            .refreshUsher({refresh_token: localStorage.getItem('refresh_token')})
            .pipe(
              flatMap(auth => {
              localStorage.setItem('access_token', auth.access_token);
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${auth.access_token}`
                }
              });
              return next.handle(newReq);
            }));
        } else {
          return throwError(error);
        }
    }));
  }
}
