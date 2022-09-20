import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, of, firstValueFrom, EmptyError, lastValueFrom, Subject } from 'rxjs';
import { map, catchError, tap, first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Credentials, LoginResponse, RegisterParams, ResetInitParams, ResetParams, User } from '../models/user.model';
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
    user$: Subject<User> = new Subject();
    user: User;

    private readonly ctf_at = "ctf_at";
    private readonly ctf_rt = "ctf_rt";

    constructor(
        private http: HttpClient,
        private router: Router,
        private toastService: ToastService
    ) { }

    register(user: RegisterParams): Observable<any> {
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

    login(params: Credentials): Observable<any> {
        return this.http.post(`${this.apiPath}/auth/local/login`, params, httpOptions).pipe(
            tap((response: any) => this.doLoginUser(response.user, response.tokens)),
            map((result: LoginResponse) => {
                this.toastService.present('success', `Welcome ${result.user.email}`);
                return result.user;
            }),
            catchError((error) => {
                this.toastService.present('error', error.error.message);
                return throwError(() => error.error);
            })
        );
    }

    verify(): Observable<any> {
        return this.http.post(`${this.apiPath}/auth/local/verify`, {}, httpOptions).pipe(
            tap((result: User) => {
                this.user = result;
                this.user$.next(result);
                return result;
            }),
            catchError(error => {
                this.toastService.present('error', error.error.message);
                return throwError(() => error.error);
            })
        );
    }

    logout() {
        this.http.post(`${this.apiPath}/auth/local/logout`, {}, httpOptions).pipe(
            map(() => {
                this.user$.next(null);
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


    refresh() {
        return this.http.post<any>(`${this.apiPath}/auth/local/refresh`, { refreshToken: this.getRefreshToken() }).pipe(
            tap((result) => {
                this.storeTokens(result.tokens);
            }),
            catchError((error) => {
                console.log('Intra aici');
                console.log(error.error.message);
                this.logout();
                return of(null);
            })
        );
    }


    resetInit(params: ResetInitParams): Observable<any> {
        return this.http.post(`${this.apiPath}/auth/local/reset-init`, params, httpOptions).pipe(
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

    resetComplete(params: ResetParams): Observable<any> {
        return this.http.post(`${this.apiPath}/auth/local/reset-complete`, params, httpOptions).pipe(
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

    // helpers

    getAccessToken() {
        return localStorage.getItem(this.ctf_at);
    }

    private getRefreshToken() {
        return localStorage.getItem(this.ctf_rt);
    }

    private doLoginUser(user?, tokens?) {
        this.user = user;
        this.user$.next(user);
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
}
