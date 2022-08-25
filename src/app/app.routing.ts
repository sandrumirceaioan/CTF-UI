import { Routes } from "@angular/router";
import { AuthGuard } from "./shared/guards/auth.guard";

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'welcome'
  },
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.component').then((x) => x.WelcomeComponent),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((x) => x.AuthRoutes),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.routes').then((x) => x.UserRoutes),
    // canActivateChild: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'welcome'
  }
];