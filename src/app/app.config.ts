import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptors,
  withFetch,
} from '@angular/common/http';
import { apiKeyInterceptor } from './core/interceptors/api-key.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withFetch(), 
      withInterceptors([
        loadingInterceptor, // First - handle loading
        apiKeyInterceptor,  // Second - add API key
        errorInterceptor    // Last - handle errors
      ])
    ),
  ],
};
