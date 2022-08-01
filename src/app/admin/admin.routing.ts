import { Route } from "@angular/router";
import { DashboardComponent } from "../dashboard/dashboard.component";

export const ADMIN_ROUTES: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    { path: 'dashboard', component: DashboardComponent }
];