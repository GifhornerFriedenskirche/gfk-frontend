import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NotificationService } from './notification.service';

export interface AppError {
  message: string;
  status?: number;
  statusText?: string;
  url?: string;
  timestamp: Date;
  type: 'http' | 'client' | 'network';
}

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  private notificationService = inject(NotificationService);

  handleHttpError(error: HttpErrorResponse): Observable<never> {
    const appError: AppError = {
      message: this.getErrorMessage(error),
      status: error.status,
      statusText: error.statusText,
      url: error.url || undefined,
      timestamp: new Date(),
      type: this.getErrorType(error),
    };

    // Log error to console (in production, send to logging service)
    console.error('HTTP Error occurred:', appError);

    // Show user-friendly error notification
    this.showErrorNotification(appError);

    return throwError(() => appError);
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.error?.message) {
      return error.error.message;
    }

    switch (error.status) {
      case 0:
        return 'Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.';
      case 400:
        return 'Ungültige Anfrage. Bitte versuchen Sie es erneut.';
      case 401:
        return 'Nicht autorisiert. Bitte melden Sie sich an.';
      case 403:
        return 'Zugriff verweigert. Sie haben keine Berechtigung für diese Aktion.';
      case 404:
        return 'Die angeforderten Daten wurden nicht gefunden.';
      case 412:
        return 'Authentifizierung fehlgeschlagen. Bitte versuchen Sie es erneut.';
      case 500:
        return 'Serverfehler. Bitte versuchen Sie es später erneut.';
      case 503:
        return 'Service nicht verfügbar. Bitte versuchen Sie es später erneut.';
      default:
        return `Ein unerwarteter Fehler ist aufgetreten (${error.status}).`;
    }
  }

  private getErrorType(
    error: HttpErrorResponse
  ): 'http' | 'client' | 'network' {
    if (error.status === 0) {
      return 'network';
    } else if (error.status >= 400 && error.status < 500) {
      return 'client';
    } else {
      return 'http';
    }
  }

  private showErrorNotification(error: AppError): void {
    // Show notification to user
    this.notificationService.showError('Fehler', error.message);
  }

  handleClientError(error: Error): Observable<never> {
    const appError: AppError = {
      message: error.message || 'Ein unerwarteter Fehler ist aufgetreten.',
      timestamp: new Date(),
      type: 'client',
    };

    console.error('Client Error occurred:', appError);
    this.showErrorNotification(appError);

    return throwError(() => appError);
  }
}
