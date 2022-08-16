import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { WelcomeComponent } from "./welcome/welcome.component";

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'welcome'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.routing').then(mod => mod.ADMIN_ROUTES)
  },
  {
    path: '**',
    component: LoginComponent
  }
];