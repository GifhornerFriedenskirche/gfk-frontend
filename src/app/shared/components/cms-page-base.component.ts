import { Component, OnInit, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { BasePageComponent } from './base-page.component';
import { PagesService } from '../../core/services/pages.service';
import {
  PageApiResponse,
  PageLayoutComponent,
  PageLayoutWithSections,
} from '../../core/interfaces/page.interface';

/**
 * Base component for CMS-driven pages with dynamic layout
 */
@Component({
  template: '',
})
export abstract class CmsPageBaseComponent extends BasePageComponent implements OnInit {
  pageData!: PageApiResponse;
  isLoading = true;

  protected readonly pagesService = inject(PagesService);
  protected abstract readonly pageSlug: string;

  ngOnInit(): void {
    this.deferredLoadData();
  }

  /**
   * Defer data loading to prevent ExpressionChangedAfterItHasBeenCheckedError
   * @private
   */
  private deferredLoadData(): void {
    setTimeout(() => this.loadData(), 0);
  }

  loadData(): void {
    this.resetErrorState();
    this.setLoadingState(true);

    this.pagesService.getPageByRoute(this.pageSlug).subscribe({
      next: (pageResponse: PageApiResponse) => this.handleDataSuccess(pageResponse),
      error: (error: HttpErrorResponse) => this.handleDataError(error),
    });
  }

  /**
   * Set loading state
   * @private
   */
  private setLoadingState(loading: boolean): void {
    this.isLoading = loading;
  }

  /**
   * Handle successful data loading
   * @private
   */
  private handleDataSuccess(pageResponse: PageApiResponse): void {
    this.pageData = pageResponse;
    this.setLoadingState(false);
  }

  /**
   * Handle data loading error
   * @private
   */
  private handleDataError(error: HttpErrorResponse): void {
    this.setErrorState(error);
    this.setLoadingState(false);
  }

  /**
   * Helper method to get layout components as an array
   */
  getLayoutComponents(): PageLayoutComponent[] {
    if (!this.pageData?.data?.layout) {
      return [];
    }

    // If layout is an array (new structure)
    if (Array.isArray(this.pageData.data.layout)) {
      return this.pageData.data.layout;
    }

    // If layout has before/after structure (old structure)
    const layoutWithSections = this.pageData.data.layout as PageLayoutWithSections;
    const components: PageLayoutComponent[] = [];

    if (layoutWithSections.before) {
      components.push(...layoutWithSections.before);
    }
    if (layoutWithSections.after) {
      components.push(...layoutWithSections.after);
    }

    return components;
  }

  /**
   * Helper method to check if layout has components
   */
  hasLayoutComponents(): boolean {
    return this.getLayoutComponents().length > 0;
  }
}
