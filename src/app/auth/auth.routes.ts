import { Routes } from "@angular/router";

export const AuthRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('../login/login.component').then((x) => x.LoginComponent),
    },
    {
        path: 'register',
        loadComponent: () => import('../register/register.component').then((x) => x.RegisterComponent),
    },
    {
        path: 'forgot',
        loadComponent: () => import('../forgot/forgot.component').then((x) => x.ForgotComponent),
    },
    {
        path: 'reset/:token',
        loadComponent: () => import('../reset/reset.component').then((x) => x.ResetComponent),
    },

];