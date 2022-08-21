import { Routes } from "@angular/router";

export const CtfRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../ctf/ctf.component').then((x) => x.CtfComponent),
    },

];