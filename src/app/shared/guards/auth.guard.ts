import { Injectable } from '@angular/core';
import { Router, Route, CanActivateChild } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivateChild {
    public jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    async canActivateChild(route: Route): Promise<boolean> {
        // allow activate if acces token exists and not expired
        const accessToken = this.authService.getToken('ctf_at');
        if (accessToken && !this.jwtHelper.isTokenExpired(accessToken)) {
            return true;
        } else {
            this.authService.removeToken('ctf_at');
        }

        // prevent activate if refresh token is missing 
        const refreshToken: string | null = this.authService.getToken('ctf_rt');
        if (!refreshToken) {
            this.router.navigate(['/auth/login']);
            return false;
        }

        // get new pair of access token and refresh token
        try {
            const tokens = await this.authService.refresh(refreshToken);
            if (tokens && tokens.access_token && tokens.refresh_token) {
                console.log('REFRESHED');
                return true;
            } else {
                console.log('NOT REFRESHED');
                this.router.navigate(['/auth/login']);
                return false;
            }
        } catch (error) {
            console.log('EXPIRED');
            this.router.navigate(['/auth/login']);
            return false;
        }
    }

}
