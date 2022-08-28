import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastService } from '../shared/services/toast.service';
import { Router } from '@angular/router';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    apiPath: string = environment.BACKEND_URL;
    private pages = [
        {
            title: 'Dashboard',
            url: '/admin/dashboard',
            icon: 'stats-chart',
        },
        {
            title: 'Categories',
            url: '/admin/categories',
            icon: 'folder',
        },
        {
            title: 'Ads',
            url: '/admin/dashboard',
            icon: 'newspaper',
        },
        {
            title: 'Users',
            url: '/admin/dashboard',
            icon: 'people',
        },
    ];

    constructor(
    ) { }

    getPages(): any[] {
        return this.pages;
    }


    // helpers
}
