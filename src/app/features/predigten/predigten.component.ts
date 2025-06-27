import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { PagesService } from '../../core/services/pages.service';
import { BasePageComponent } from '../../shared/components/base-page.component';
import {
  PageApiResponse,
  PageLayoutComponent,
  PageLayoutWithSections,
} from '../../core/interfaces/page.interface';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import { DynamicLayoutComponent } from '../../shared/components/dynamic-layout/dynamic-layout.component';

@Component({
  selector: 'app-predigten',
  standalone: true,
  imports: [
    CommonModule,
    LoadingStateComponent,
    ErrorStateComponent,
    DynamicLayoutComponent,
  ],
  templateUrl: './predigten.component.html',
})
export class PredigtenComponent extends BasePageComponent implements OnInit {
  pageData!: PageApiResponse;
  isLoading: boolean = true;

  private readonly pagesService = inject(PagesService);

  ngOnInit(): void {
    // Defer loadData to the next macrotask (event loop tick)
    // to prevent ExpressionChangedAfterItHasBeenCheckedError.
    setTimeout(() => this.loadData(), 0);
  }

  loadData(): void {
    this.resetErrorState();
    this.isLoading = true;

    const pageSlug = 'predigten';

    this.pagesService.getPageByRoute(pageSlug).subscribe({
      next: (pageResponse: PageApiResponse) => {
        this.pageData = pageResponse;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.setErrorState(error);
        this.isLoading = false;
      },
    });
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
    const layoutWithSections = this.pageData.data
      .layout as PageLayoutWithSections;
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
