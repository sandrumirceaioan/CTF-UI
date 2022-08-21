import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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

    signIn(params: Credentials): Observable<any> {
        return this.http.post(`${this.apiPath}/auth/login`, params, httpOptions).pipe(
            map((result: any) => {
                this.toastService.present('success', `Welcome ${result.user.email}`);
                this.setToken(result.token);
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

    registerUser(user: RegisterParams): Observable<any> {
        return this.http.post(this.apiPath + '/auth/register', user, httpOptions).pipe(
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

    // verify(): Observable<any> {
    //     let id = localStorage.getItem('userId');
    //     return this.http.get(`${this.apiPath}/users/` + id, httpOptions).pipe(
    //         map((result: any) => {
    //             this.userInfo = result;
    //             return result;
    //         }),
    //         catchError((error) => {
    //             this.toastr.error(error.error.message || error.error);
    //             return throwError(() => error.error);
    //         })
    //     );
    // }

    signOut(): void {
        this.user = null;
        this.removeToken();
    }

    public getToken(): any {
        return localStorage.getItem('ctf_token');
    }

    public setToken(token: string) {
        localStorage.setItem('ctf_token', token);
    }

    public removeToken() {
        localStorage.removeItem('ctf_token');
    }
}
