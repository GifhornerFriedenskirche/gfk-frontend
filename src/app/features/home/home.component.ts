import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { Hero } from '../../core/interfaces/hero.interface';
import { PageDataService } from '../../core/services/page-data.service';
import { HeroSkeletonComponent } from '../../shared/components/hero-skeleton.component';
import { BasePageComponent } from '../../shared/components/base-page.component';
import { HomepageContentComponent } from './components/homepage-content.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroSkeletonComponent, HomepageContentComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent extends BasePageComponent implements OnInit {
  data: Hero | null = null;
  showHomepageContent = false;
  isLoading = false; // Local loading state

  private readonly pageDataService = inject(PageDataService);

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.resetErrorState();
    this.showHomepageContent = false;
    this.isLoading = true;
    this.pageDataService.getHomePageData().subscribe({
      next: (heroData: Hero) => {
        // Use setTimeout to ensure state changes happen after current change detection cycle
        setTimeout(() => {
          this.data = heroData;
          this.isLoading = false;
          this.showHomepageContent = true;
        });
      },
      error: (error: HttpErrorResponse) => {
        // Use setTimeout to ensure state changes happen after current change detection cycle
        setTimeout(() => {
          this.setErrorState(error);
          this.data = null;
          this.isLoading = false;
        });
      },
    });
  }
}
