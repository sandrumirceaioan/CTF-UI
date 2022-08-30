import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToastService } from '../../shared/services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from 'src/app/shared/models/category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    apiPath: string = environment.BACKEND_URL;
    categories: Category[];

    page = {
        offset: 0,
        skip: 0,
        limit: 10,
        sort: null,
        direction: null,
        search: null,
        count: 0,
    };

    constructor(
        private http: HttpClient,
        private toastService: ToastService,
        private spinner: NgxSpinnerService
    ) { }

    getCategories(): Observable<{ count: number; categories: Category[] }> {
        this.spinner.show();
        let params = new HttpParams();

        if (this.page.sort) params = params.append('sort', this.page.sort);
        if (this.page.direction) params = params.append('direction', this.page.direction);
        if (this.page.search) params = params.append('search', this.page.search.toString());

        params = params.append('skip', (this.page.skip * this.page.offset).toString());
        params = params.append('limit', this.page.limit.toString());

        return this.http.get(`${this.apiPath}/categories`, { params: params }).pipe(
            map((result: any) => {
                this.spinner.hide();
                this.categories = result.categories;
                return result;
            }),
            catchError(error => {
                this.spinner.hide();
                this.toastService.present('error', error.error.message);
                return throwError(() => error.error);
            })
        );
    }

    getCategory(id: string): Observable<Category> {
        this.spinner.show();
        return this.http.get(`${this.apiPath}/categories/` + id).pipe(
            map((result: any) => {
                this.spinner.hide();
                return result;
            }),
            catchError(error => {
                this.spinner.hide();
                this.toastService.present('error', error.error.message);
                return throwError(() => error.error);
            })
        );
    }

    saveCategory(id: string, data: any): Observable<any> {
        this.spinner.show();

        const formData = new FormData();
        if (data.url) formData.append('url', data.url);
        if (data.name) formData.append('name', data.name);
        if (data.summary) formData.append('summary', data.summary);
        if (data.description) formData.append('description', data.description);
        if (data.parent) formData.append('parent', data.parent);
        formData.append('status', data.status);

        if (data.thumbnail) formData.append('thumbnail', data.thumbnail);
        if (data.banner) formData.append('banner', data.banner);

        return this.http.put(`${this.apiPath}/categories/` + id, formData).pipe(
            map((result: any) => {
                this.spinner.hide();
                this.toastService.present('success', 'Category saved');
                return result;
            }),
            catchError(error => {
                this.spinner.hide();
                this.toastService.present('error', error.error.message);
                return throwError(() => error.error);
            })
        );
    }

}
