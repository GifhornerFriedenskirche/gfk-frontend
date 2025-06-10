import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, delay } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Show loading for API requests only
  if (req.url.includes('content-dev.gifhorner-friedenskirche.de')) {
    loadingService.showLoading();
  }

  return next(req).pipe(
    // Add minimum delay to see loading state (only in development)
    delay(300),
    finalize(() => {
      // Hide loading when request completes (success or error)
      if (req.url.includes('content-dev.gifhorner-friedenskirche.de')) {
        // Add a small delay before hiding to prevent flickering
        setTimeout(() => loadingService.hideLoading(), 100);
      }
    })
  );
};
