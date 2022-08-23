import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Breadcrumb } from './breadcrumbs.interface';

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService {
    breadcrumbs: Breadcrumb[] = [];

    // Subject emitting the breadcrumb hierarchy
    private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

    // Observable exposing the breadcrumb hierarchy
    readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

    constructor(private router: Router) {
        this.router.events.pipe(
            // Filter the NavigationEnd events as the breadcrumb is updated only when the route reaches its end
            filter((event) => event instanceof NavigationEnd)
        ).subscribe(event => {
            // Reset previous breadcrumbs
            this.breadcrumbs = [];

            // Construct the breadcrumb hierarchy
            const root = this.router.routerState.snapshot.root;
            this.addBreadcrumb(root, []);

            // Emit the new hierarchy
            this._breadcrumbs$.next(this.breadcrumbs);
        });
    }

    private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[]) {
        if (route) {
            // Construct the route URL
            const routeUrl = parentUrl.concat(route.url.map(url => url.path));

            // Add an element for the current route part
            if (route.data['title']) {
                const breadcrumb = {
                    label: route.data['title'],
                    url: '/' + routeUrl.join('/'),
                    // icon: route.data['icon'] - Aici vine "users" si generezi un icon cu el
                    // <fa-icon [icon]="['fas', {{breadcrumb.icon}}]" class="text-blue px-2 fa-md"></fa-icon>
                };
                console.log(breadcrumb)
                this.breadcrumbs.push(breadcrumb);
            }

            // Add another element for the next route part
            this.addBreadcrumb(route.firstChild, routeUrl);
        }
    }


}
