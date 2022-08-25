import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { catchError, first, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('INTERCEPT');
    let token = this.authService.getToken('ctf_at') || null;
    let requestClone = this.addTokenToHeader(request, token);
    return next.handle(requestClone).pipe(
      catchError(error => {
        if (error.status === 401 && !this.freeRoute(requestClone.url)) {
          console.log('AT EXPIRED');
          return this.handleRefrehToken(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  handleRefrehToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authService.getToken('ctf_rt') || null;
    console.log('REFRESH TRY');
    return this.authService.getRefreshedTokens().pipe(
      switchMap((result: any) => {
        console.log('SWITCH: ', result);
        this.authService.setToken('ctf_at', result.tokens.access_token);
        this.authService.setToken('ctf_at', result.tokens.refresh_token);
        console.log('RT OK');
        return next.handle(this.addTokenToHeader(request, token));
      }),
      catchError(error => {
        console.log('RT EXPIRED');
        this.authService.logout();
        return throwError(() => error);
      })
    );
  }

  addTokenToHeader(request: HttpRequest<any>, at: any) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${at}`
      }
    });
  }

  freeRoute(url: string) {
    const notProtected = ['login', 'register'];
    let urlSegment = url.split('/').pop().trim();
    return notProtected.includes(urlSegment) ? true : false;
  }

}