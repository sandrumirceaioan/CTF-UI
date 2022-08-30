import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { forkJoin, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CategoriesService } from '../categories.service';


@Injectable()
export class EditCategoryResolve implements Resolve<any> {

    constructor(
        private categoriesService: CategoriesService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const lastRoute = this.router.url;
        const categoryId = route.params['categoryId'];

        return forkJoin({
            category: this.categoriesService.getCategory(categoryId),
        }).pipe(
            map((result: any) => {
                return result;
            }),
            catchError((error) => {
                this.router.navigate([lastRoute]);
                return throwError(() => error.error);
            })
        );
    }
}