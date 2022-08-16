import { enableProdMode, importProvidersFrom, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from './environments/environment';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app/app.routing';

import { AppComponent } from './app/app.component';
import { AppService } from './app/app.service';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: AppService, useClass: AppService },
    { provide: environment.BACKEND_URL, useValue: environment.BACKEND_URL },
    importProvidersFrom(
      RouterModule.forRoot(APP_ROUTES),
      IonicModule.forRoot(),
      HttpClientModule
    ),
  ]
}).catch((err) => console.error(err));