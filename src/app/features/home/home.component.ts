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
  titleSectionHeadline: string | null = null; // Headline from Kachel - Überschrift
  titleSectionSubline: string | null = null; // Subline from Kachel - Überschrift

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
    this.pagesService.getPageByRoute('/startseite').subscribe({
      next: (pageResponse: PageApiResponse) => {
        console.log('Full response:', pageResponse);

        // Extract title section data from "tileSectionHeadline" property
        const pageData = pageResponse.data as any;
        if (pageData && pageData.data && pageData.data.tileSectionHeadline) {
          const titleData = pageData.data.tileSectionHeadline;
          console.log('tileSectionHeadline data:', titleData);

          if (Array.isArray(titleData) && titleData.length > 0) {
            const firstItem = titleData[0];
            console.log('Title section item:', firstItem);

            if (firstItem.data) {
              this.titleSectionHeadline =
                firstItem.data.titleSectionHeadline || null;
              this.titleSectionSubline =
                firstItem.data.titleSectionSubline || null;
              console.log('Extracted headline:', this.titleSectionHeadline);
              console.log('Extracted subline:', this.titleSectionSubline);
            }
          }
        }

        setTimeout(() => {
          this.pageData = pageResponse;
          this.isLoading = false;
          this.showHomepageContent = true;
        });
      },
      error: () => {
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
