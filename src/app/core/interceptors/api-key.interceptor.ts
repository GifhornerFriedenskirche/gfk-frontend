import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  console.log(
    `🔥 INTERCEPTOR [${isBrowser ? 'BROWSER' : 'SERVER'}]: ${req.url}`
  );
  console.log('🔑 API Key:', environment.apiKey);

  // Only add API key to requests going to your API
  if (req.url.includes(environment.apiBaseUrl)) {
    console.log(
      `✅ ADDING API KEY [${isBrowser ? 'BROWSER' : 'SERVER'}]: ${req.url}`
    );

    const apiReq = req.clone({
      setHeaders: {
        'api-key': environment.apiKey,
      },
    });

    console.log('🔐 API key header:', apiReq.headers.get('api-key'));
    return next(apiReq);
  }

  console.log(
    `❌ NOT ADDING API KEY [${isBrowser ? 'BROWSER' : 'SERVER'}]: ${req.url}`
  );
  return next(req);
};
