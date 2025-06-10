// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-unsere-gemeinde',
//   standalone: true,
//   imports: [],
//   templateUrl: './unsere-gemeinde.component.html',
// })
// export class UnsereGemeindeComponent {}

import { Component, OnInit, inject } from '@angular/core';
import { Hero } from '../../core/interfaces/hero.interface';
import { CommonModule } from '@angular/common';
import { BaseService } from '../../core/services/base.service';
import { PageDataService } from '../../core/services/page-data.service';

@Component({
  selector: 'app-unsere-gemeinde',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unsere-gemeinde.component.html',
})
export class UnsereGemeindeComponent implements OnInit {
  data!: Hero;
  private pageDataService = inject(PageDataService);
  private baseService = inject(BaseService);

  constructor() {}

  ngOnInit(): void {
    this.pageDataService.getUnsereGemeindeData().subscribe({
      next: (heroData: unknown) => {
        console.log('heroData', heroData);
        this.data = heroData as Hero;
      },
      error: (error) => {
        console.error('Error loading page data:', error);
      },
    });
  }

  getFullImagePath(path: string): string {
    return `${this.baseService.getBaseImagePathUrl()}${path}`;
  }
}

// export class UnsereGemeindeComponent {}
