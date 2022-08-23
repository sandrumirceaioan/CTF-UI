import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, of, firstValueFrom, EmptyError, lastValueFrom } from 'rxjs';
import { map, catchError, tap, first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Credentials, RegisterParams, ResetInitParams, ResetParams } from '../models/user.model';
import { ToastService } from './toast.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiPath: string = environment.BACKEND_URL;
    user: any = null;

    constructor(
        private http: HttpClient,
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

    signIn(params: Credentials): Observable<any> {
        return this.http.post(`${this.apiPath}/auth/local/login`, params, httpOptions).pipe(
            map((result: any) => {
                this.toastService.present('success', `Welcome ${result.user.email}`);
                this.setToken('ctf_at', result.tokens.access_token);
                this.setToken('ctf_rt', result.tokens.refresh_token);
                this.user = result.user;
                return result.user;
            }),
            catchError(error => {
                this.toastService.present('error', error.error.message);
                // this.toastr.error(error.error.message || error.error);
                return throwError(() => error.error);
            })
        );
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

    refresh(refreshToken: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(`${this.apiPath}/auth/local/refresh`, { refreshToken }, httpOptions).pipe(
                first(),
                map((result: any) => {
                    this.setToken('ctf_at', result.tokens.access_token);
                    this.setToken('ctf_rt', result.tokens.refresh_token);
                    this.user = result.user;
                    return result.tokens;
                }),
                catchError((error: any) => {
                    this.toastService.present('error', error.error.message);
                    return throwError(() => error.error);
                })
            ).subscribe({
                next: (tokens) => {
                    resolve(tokens);
                },
                error: (error) => {
                    reject(error);
                }
            });

        })
    }

    signOut(): void {
        this.user = null;
        this.removeToken('ctf_at');
        this.removeToken('ctf_rt');
    }

    public getToken(name): any {
        return localStorage.getItem(name);
    }

    public setToken(name, token: string) {
        localStorage.setItem(name, token);
    }

    public removeToken(name) {
        localStorage.removeItem(name);
    }
}
