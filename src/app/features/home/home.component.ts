import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Hero } from '../../core/interfaces/hero.interface';
import { PageDataService } from '../../core/services/page-data.service';
import { HeroSkeletonComponent } from '../../shared/components/hero-skeleton.component';
import { BasePageComponent } from '../../shared/components/base-page.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroSkeletonComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent extends BasePageComponent implements OnInit {
  data: Hero | null = null;

  private readonly pageDataService = inject(PageDataService);

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.resetErrorState();

    this.pageDataService.getStartseiteData().subscribe({
      next: (heroData: Hero) => {
        this.data = heroData;
      },
      error: (error) => {
        this.setErrorState(error);
        this.data = null;
      },
    });
  }
}
