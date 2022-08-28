import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { catchError, map, take } from "rxjs/operators";
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(
        private authService: AuthService,

    ) { }
    canActivate(next): Observable<boolean> {
        return this.authService.user$.pipe(
            take(1),
            map((user: User) => {
                if (next.data.roles.includes(user.role)) {
                    return true;
                } else {
                    this.authService.logout();
                    return false;
                }
            })
        );
    }

}
