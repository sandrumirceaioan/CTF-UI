import { Routes } from "@angular/router";
import { AuthGuard } from "./shared/guards/auth.guard";
import { RoleGuard } from "./shared/guards/role.guard";

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
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['user', 'admin'] }
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.AdminRoutes),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: '**',
    redirectTo: 'welcome'
  }
];