import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { Hero } from '../../core/interfaces/hero.interface';
import { PageDataService } from '../../core/services/page-data.service';
import { PagesService } from '../../core/services/pages.service';
import { HeroSkeletonComponent } from '../../shared/components/hero-skeleton.component';
import { BasePageComponent } from '../../shared/components/base-page.component';
import { HomepageContentComponent } from './components/homepage-content.component';
import { DynamicLayoutComponent } from '../../shared/components/dynamic-layout/dynamic-layout.component';
import {
  PageApiResponse,
  PageLayoutComponent,
  PageLayoutWithSections,
} from '../../core/interfaces/page.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSkeletonComponent,
    HomepageContentComponent,
    DynamicLayoutComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent extends BasePageComponent implements OnInit {
  // Data properties
  data: Hero | null = null;
  pageData: PageApiResponse | null = null;
  showHomepageContent = false;
  isLoading = false;

  // Title section properties
  titleSectionHeadline: string | null = null;
  titleSectionSubline: string | null = null;

  // Injected services
  private readonly pageDataService = inject(PageDataService);
  private readonly pagesService = inject(PagesService);

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Load all data needed for the homepage
   */
  loadData(): void {
    this.resetErrorState();
    this.showHomepageContent = false;
    this.isLoading = true;

    // Load hero data and then page data
    this.pageDataService.getHomePageData().subscribe({
      next: (heroData: Hero) => {
        this.data = heroData;
        this.loadPageData();
      },
      error: (error: HttpErrorResponse) => {
        this.setErrorState(error);
        this.data = null;
        this.isLoading = false;
      },
    });
  }

  /**
   * Load page data for dynamic layout components and title section
   */
  private loadPageData(): void {
    this.pagesService.getPageByRoute('/startseite').subscribe({
      next: (pageResponse: PageApiResponse) => {
        // Store page data
        this.pageData = pageResponse;
        
        console.log('🏠 Homepage PageData:', this.pageData);
        
        // Debug logging for text-image components
        const textImageComponents = this.extractTextImageComponents(pageResponse);
        console.log('🖼️ Text-Image Components:', textImageComponents);

        // Extract title section data
        this.extractTitleSectionData(pageResponse);

        // Update UI state
        this.isLoading = false;
        this.showHomepageContent = true;
      },
      error: () => {
        this.isLoading = false;
        this.showHomepageContent = true;
      },
    });
  }

  /**
   * Extract title section data from the API response
   */
  private extractTitleSectionData(pageResponse: PageApiResponse): void {
    if (!pageResponse?.data?.data?.tileSectionHeadline) {
      return;
    }

    const titleDataArray = pageResponse.data.data.tileSectionHeadline;

    if (Array.isArray(titleDataArray) && titleDataArray.length > 0) {
      const firstItem = titleDataArray[0];

      if (firstItem.data) {
        this.titleSectionHeadline = firstItem.data.titleSectionHeadline || null;
        this.titleSectionSubline = firstItem.data.titleSectionSubline || null;
      }
    }
  }

  /**
   * Extract and return all text-image components from the page data
   * Used for debugging purposes
   */
  private extractTextImageComponents(
    pageResponse: PageApiResponse
  ): PageLayoutComponent[] {
    const layout = pageResponse?.data?.layout;
    if (!layout) {
      return [];
    }

    // Handle different layout formats
    if (Array.isArray(layout)) {
      // If layout is an array of components
      return layout.filter(
        (component) => component.component === 'text_image'
      );
    } else {
      // If layout is a PageLayoutWithSections
      const layoutWithSections = layout as PageLayoutWithSections;
      const components: PageLayoutComponent[] = [];
      
      // Check before section
      if (layoutWithSections.before && Array.isArray(layoutWithSections.before)) {
        components.push(...layoutWithSections.before.filter(
          (component) => component.component === 'text_image'
        ));
      }
      
      // Check after section
      if (layoutWithSections.after && Array.isArray(layoutWithSections.after)) {
        components.push(...layoutWithSections.after.filter(
          (component) => component.component === 'text_image'
        ));
      }
      
      return components;
    }
  }

  /**
   * Check if page has layout components
   */
  hasLayoutComponents(): boolean {
    return !!(
      this.pageData?.data?.layout && this.getLayoutComponents().length > 0
    );
  }

  /**
   * Check if the title section should be displayed
   */
  hasTitleSection(): boolean {
    return !!(this.titleSectionHeadline && this.titleSectionSubline);
  }

  /**
   * Get layout components from page data
   */
  getLayoutComponents(): PageLayoutComponent[] {
    if (!this.pageData?.data?.layout) {
      return [];
    }

    // Handle array layout
    if (Array.isArray(this.pageData.data.layout)) {
      return this.pageData.data.layout.filter(
        (component: PageLayoutComponent) => !component.hidden
      );
    }

    // Handle object layout with sections
    const layoutWithSections = this.pageData.data
      .layout as PageLayoutWithSections;
    const components: PageLayoutComponent[] = [];

    // Add components from before section
    if (layoutWithSections.before) {
      components.push(
        ...layoutWithSections.before.filter(
          (component: PageLayoutComponent) => !component.hidden
        )
      );
    }

    // Add components from after section
    if (layoutWithSections.after) {
      components.push(
        ...layoutWithSections.after.filter(
          (component: PageLayoutComponent) => !component.hidden
        )
      );
    }

    return components;
  }
}
