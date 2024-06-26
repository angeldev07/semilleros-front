import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom([BrowserAnimationsModule, FormsModule]), // Asegúrate de incluir FormsModule
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
};
