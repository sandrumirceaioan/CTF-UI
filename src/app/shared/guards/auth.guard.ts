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
       
        return true;
    }

}
