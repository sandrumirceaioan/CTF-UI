import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, of, firstValueFrom, EmptyError, lastValueFrom } from 'rxjs';
import { map, catchError, tap, first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Credentials, RegisterParams, ResetInitParams, ResetParams } from '../models/user.model';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiPath: string = environment.BACKEND_URL;
    user: any = null;

    private readonly ctf_at = "ctf_at";
    private readonly ctf_rt = "ctf_rt";

    constructor(
        private http: HttpClient,
        private router: Router,
        private toastService: ToastService
    ) { }

    registerUser(user: RegisterParams): Observable<any> {
        return this.http.post(this.apiPath + '/auth/local/register', user, httpOptions).pipe(
            map(result => {
                this.toastService.present('success', `Inregistrat cu succes`);
                return result;
            }),
            catchError(error => {
                this.toastService.present('error', error.error.message);
                return throwError(() => error.error);
            })
        )
    }

    resetPasswordInit(params: ResetInitParams): Observable<any> {
        return this.http.post(`${this.apiPath}/auth/reset-password-init`, params, httpOptions).pipe(
            map((result: any) => {
                this.toastService.present('success', `Pentru a finaliza resetarea parolei vetifica adresa de email si urmeaza instructiunile`, 10000);
                return result;
            }),
            catchError(error => {
                this.toastService.present('error', error.error.message);
                return throwError(() => error.error);
            })
        );
    }

    resetPassword(params: ResetParams): Observable<any> {
        return this.http.post(`${this.apiPath}/auth/reset-password`, params, httpOptions).pipe(
            map((result: any) => {
                this.toastService.present('success', `Ai alta parola frate`);
                return result;
            }),
            catchError(error => {
                this.toastService.present('error', error.error.message);
                return throwError(() => error.error);
            })
        );
    }


    login(params: Credentials): Observable<any> {
        return this.http.post(`${this.apiPath}/auth/local/login`, params, httpOptions).pipe(
            tap((response: any) => this.doLoginUser(response.user, response.tokens)),
            map((result) => {
                return result.user;
            }),
            catchError((error) => {
                this.toastService.present('error', error.error.message);
                return throwError(() => error.error);
            })
        );
    }

    isLoggedIn() {
        return !!this.getAccessToken();
    }

    refreshToken() {
        return this.http.post<any>(`${this.apiPath}/auth/local/refresh`, { refreshToken: this.getRefreshToken() }).pipe(
            tap((result) => {
                this.storeTokens(result.tokens);
            }),
            catchError((error) => {
                console.log('Intra aici');
                console.log(error.error.message);
                this.logout();
                return of(false);
            })
        );
    }

    getAccessToken() {
        return localStorage.getItem(this.ctf_at);
    }

    private getRefreshToken() {
        return localStorage.getItem(this.ctf_rt);
    }

    private doLoginUser(user?, tokens?) {
        this.user = user;
        this.storeTokens(tokens);
    }

    private storeTokens(tokens) {
        localStorage.setItem(this.ctf_at, tokens.access_token);
        localStorage.setItem(this.ctf_rt, tokens.refresh_token);
    }

    private removeTokens() {
        localStorage.removeItem(this.ctf_at);
        localStorage.removeItem(this.ctf_rt);
    }

    verifyAccessToken(): Observable<any> {
        return this.http.post(`${this.apiPath}/auth/local/verify`, {}, httpOptions).pipe(
            map((result: any) => {
                return result;
            }),
            catchError(error => {
                return throwError(() => error.error);
            })
        );
    }

    logout() {
        this.http.post(`${this.apiPath}/auth/local/logout`, {}, httpOptions).pipe(
            map(() => {
                this.user = null;
                this.removeTokens();
                this.router.navigate(['/auth/login']);
                console.log('LOGGED OUT');
                return;
            }),
            catchError(error => {
                this.router.navigate(['/auth/login']);
                return throwError(() => error.error);
            })
        ).subscribe();
    }
}
