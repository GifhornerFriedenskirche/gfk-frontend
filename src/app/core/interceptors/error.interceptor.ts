import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../services/error-handler.service';
import { LoadingService } from '../services/loading.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorHandler = inject(ErrorHandlerService);
  const loadingService = inject(LoadingService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Hide loading spinner on error
      loadingService.hideLoading();
      
      // Handle the error
      return errorHandler.handleHttpError(error);
    })
  );
};
