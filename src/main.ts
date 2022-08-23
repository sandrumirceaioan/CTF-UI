import { enableProdMode, importProvidersFrom, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from './environments/environment';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app/app.routing';

import { AppComponent } from './app/app.component';
import { AppService } from './app/app.service';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './app/shared/interceptors/request.interceptor';
import { AuthGuard } from './app/shared/guards/auth.guard';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: AppService, useClass: AppService },
    { provide: environment.BACKEND_URL, useValue: environment.BACKEND_URL },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    AuthGuard,
    importProvidersFrom(
      RouterModule.forRoot(APP_ROUTES),
      IonicModule.forRoot(),
      HttpClientModule
    ),
  ]
}).catch((err) => console.error(err));