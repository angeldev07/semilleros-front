import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom([BrowserAnimationsModule ]),
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
};
