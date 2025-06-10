import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  // Only add API key to requests going to your API
  if (req.url.includes(environment.apiBaseUrl)) {
    const apiReq = req.clone({
      setHeaders: {
        'api-key': environment.apiKey,
      },
    });

    return next(apiReq);
  }

  return next(req);
};
