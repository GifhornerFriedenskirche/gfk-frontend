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
  data: Hero | null = null;
  pageData: PageApiResponse | null = null;
  showHomepageContent = false;
  isLoading = false; // Local loading state

  private readonly pageDataService = inject(PageDataService);
  private readonly pagesService = inject(PagesService);

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.resetErrorState();
    this.showHomepageContent = false;
    this.isLoading = true;

    // Load both hero data and page data for layout components
    this.pageDataService.getHomePageData().subscribe({
      next: (heroData: Hero) => {
        setTimeout(() => {
          this.data = heroData;
          this.loadPageData(); // Load page data for layout components
        });
      },
      error: (error: HttpErrorResponse) => {
        setTimeout(() => {
          this.setErrorState(error);
          this.data = null;
          this.isLoading = false;
        });
      },
    });
  }

  /**
   * Load page data for dynamic layout components
   */
  private loadPageData(): void {
    console.log('Loading page data from /api/pages/page?route=/startseite...');
    this.pagesService.getPageByRoute('/startseite').subscribe({
      next: (pageResponse: PageApiResponse) => {
        console.log('=== PAGE DATA RESPONSE ===');
        console.log('Full response:', pageResponse);
        console.log('Response type:', pageResponse.type);
        console.log('Response title:', pageResponse.title);
        console.log('Response data:', pageResponse.data);

        if (pageResponse.data?.layout) {
          console.log('=== LAYOUT DATA FOUND ===');
          console.log('Layout object:', pageResponse.data.layout);

          // Check if layout has sections (before/after) or is an array
          if (Array.isArray(pageResponse.data.layout)) {
            console.log('Layout is array:', pageResponse.data.layout);
          } else {
            const layoutWithSections = pageResponse.data
              .layout as PageLayoutWithSections;
            if (layoutWithSections.before) {
              console.log('Before components:', layoutWithSections.before);
            }
            if (layoutWithSections.after) {
              console.log('After components:', layoutWithSections.after);
            }
          }
        } else {
          console.log('No layout data found in response');
        }

        setTimeout(() => {
          this.pageData = pageResponse;
          this.isLoading = false;
          this.showHomepageContent = true;

          // Log titleSection components specifically after processing
          const allComponents = this.getLayoutComponents();
          console.log('=== PROCESSED LAYOUT COMPONENTS ===');
          console.log('All processed components:', allComponents);

          const titleSections = allComponents.filter(
            (comp) => comp.component === 'titleSection'
          );
          if (titleSections.length > 0) {
            console.log('=== TITLE SECTION COMPONENTS ===');
            console.log('Found titleSection components:', titleSections);
            titleSections.forEach((section, index) => {
              console.log(`TitleSection ${index + 1}:`, section);
              console.log(`TitleSection ${index + 1} data:`, section.data);
            });
          } else {
            console.log('No titleSection components found');
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('=== PAGE DATA LOADING ERROR ===');
        console.error('Error details:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        setTimeout(() => {
          this.isLoading = false;
          this.showHomepageContent = true;
        });
      },
    });
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

    if (layoutWithSections.before) {
      components.push(
        ...layoutWithSections.before.filter(
          (component: PageLayoutComponent) => !component.hidden
        )
      );
    }
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
