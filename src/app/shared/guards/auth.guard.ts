import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    public jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(
        private authService: AuthService
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve) => {
            this.authService.verify().subscribe((result) => resolve(result))
        })
    }

}
