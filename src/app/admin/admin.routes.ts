import { Routes } from "@angular/router";

export const AdminRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./admin.component').then((x) => x.AdminComponent),
        children: [
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
                path: 'categories',
                loadComponent: () => import('./categories/categories.component').then((x) => x.CategoriesComponent),
            },
        ]
    },
    
];