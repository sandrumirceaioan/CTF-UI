import { Routes } from "@angular/router";

export const UserRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then((x) => x.DashboardComponent),
    },
    {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then((x) => x.ProfileComponent),
    },
];