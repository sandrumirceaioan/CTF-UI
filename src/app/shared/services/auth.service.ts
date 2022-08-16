import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Credentials } from '../models/user.model';
import { AES } from 'crypto-js';


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
    ) { }

    signIn(params: Credentials): Observable<any> {
        return this.http.post(`${this.apiPath}/auth/login`, params, httpOptions).pipe(
            map((result: any) => {
                this.setToken(result.token);
                localStorage.setItem('ctf_token', result.token);
                this.user = result.user;
                return result.user;
            }),
            catchError(error => {
                // this.toastr.error(error.error.message || error.error);
                return throwError(() => error.error);
            })
        );
    }

    signOut(): void {
        this.user = null;
        this.removeToken();
    }

    // register(user: User): Observable<any> {
    //     return this.http.post(this.apiPath + '/auth/register', user, httpOptions).pipe(
    //         map(result => {
    //         }),
    //         catchError(error => {
    //             this.toastr.error(error.error.message || error.error);
    //             return throwError(() => error.error);
    //         })
    //     )
    // }

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

    public getToken(): any {
        return localStorage.getItem('ctf_token');
    }

    public setToken(token: string) {
        localStorage.setItem('ctf_token', token);
    }

    public removeToken() {
        localStorage.removeItem('ctf_token');
    }

    public setRemember(login) {
        login.password = AES.encrypt(login.password, environment.CRYPTO_KEY);
        localStorage.setItem('ctf_remember', JSON.stringify(login));
    }

    public getRemember(): any {
        let login = JSON.parse(localStorage.getItem('ctf_remember'));
        console.log(login);
        if (login) {
            login.password = AES.decrypt(login.password, environment.CRYPTO_KEY);
            return login;
        } else {
            return null;
        }
    }
}
