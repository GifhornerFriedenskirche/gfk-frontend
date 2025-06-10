import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from '../../core/services/base.service';
import { LoadingService } from '../../core/services/loading.service';
import { MESSAGES } from '../../core/constants/app.constants';

/**
 * Base component that provides common functionality for page components
 */
@Component({
  template: '',
})
export abstract class BasePageComponent {
  loading$: Observable<boolean>;
  hasError: boolean = false;
  errorMessage: string = '';

  protected readonly baseService = inject(BaseService);
  protected readonly loadingService = inject(LoadingService);

  constructor() {
    this.loading$ = this.loadingService.loading$;
  }

  /**
   * Get full image path by combining base URL with relative path
   */
  getFullImagePath(path: string): string {
    return `${this.baseService.getBaseImagePathUrl()}${path}`;
  }

  /**
   * Reset error state
   */
  protected resetErrorState(): void {
    this.hasError = false;
    this.errorMessage = '';
  }
  /**
   * Set error state
   */
  protected setErrorState(error: unknown): void {
    this.hasError = true;

    // Type-safe error message extraction
    if (this.isErrorWithMessage(error)) {
      this.errorMessage = error.message;
    } else if (typeof error === 'string') {
      this.errorMessage = error;
    } else {
      this.errorMessage = MESSAGES.ERROR.DEFAULT;
    }
  }

  /**
   * Type guard to check if error has a message property
   */
  private isErrorWithMessage(error: unknown): error is { message: string } {
    return (
      error !== null &&
      typeof error === 'object' &&
      'message' in error &&
      typeof (error as { message: unknown }).message === 'string'
    );
  }

  /**
   * Abstract method to be implemented by child components for loading data
   */
  abstract loadData(): void;

  /**
   * Retry loading data
   */
  retryLoad(): void {
    this.loadData();
  }
}
