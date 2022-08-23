import { Injectable } from '@angular/core';
import { Router, CanMatch, Route, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthGuard implements CanActivate {
    public jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(
        private authService: AuthService,
        private router: Router,
        private http: HttpClient
    ) {
    }

    async canActivate(route: Route): Promise<boolean> {
        console.log('AUTH GUARD');
        const accessToken = this.authService.getToken('ctf_at');

        if (accessToken && !this.jwtHelper.isTokenExpired(accessToken)) {
            return true;
        }

        try {
            let response = await this.getRefreshToken(accessToken);
            if (response.tokens && response.tokens.accessToken && response.tokens.refreshToken) {
                console.log('REFRESH TOKENS: ', response.tokens);
                const newAccessToken = (<any>response).tokens.accessToken;
                const newRefreshToken = (<any>response).tokens.refreshToken;
                this.authService.setToken('ctf_at', newAccessToken);
                this.authService.setToken('ctf_rt', newRefreshToken);
                return true;
            } else {
                console.log('NO GET TOKENS');
                return false;
            }
        } catch (error) {
            console.log('ERR GET TOKENS ', error);
            return false;
        }
    }

    private async getRefreshToken(accessToken: string | null): Promise<any> {
        const refreshToken: string | null = this.authService.getToken('ctf_rt');

        if (!accessToken || !refreshToken) {
            return false;
        }

        return await this.authService.refresh(refreshToken);
    }
}
