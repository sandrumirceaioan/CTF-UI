import { Routes } from "@angular/router";
import { EditCategoryResolve } from "./categories/edit-category/edit-category.resolve";

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
                data: { title: 'Dashboard' },
                loadComponent: () => import('./dashboard/dashboard.component').then((x) => x.DashboardComponent),
            },
            {
                path: 'categories',
                data: { title: 'Categories' },
                loadComponent: () => import('./categories/categories.component').then((x) => x.CategoriesComponent),
            },
            {
                path: 'categories/:categoryId',
                data: { title: 'Edit Categories' },
                loadComponent: () => import('./categories/edit-category/edit-category.component').then((x) => x.EditCategoryComponent),
                resolve: {
                    data: EditCategoryResolve
                }
            },
            {
                path: '**',
                redirectTo: '/admin/categories'
            }
        ]
    },

];