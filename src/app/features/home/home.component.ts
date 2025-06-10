import { Component, OnInit, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

import { Hero } from '../../core/interfaces/hero.interface';
import { CommonModule } from '@angular/common';
import { BaseService } from '../../core/services/base.service';
import { PageDataService } from '../../core/services/page-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  data!: Hero;
  private pageDataService = inject(PageDataService);
  private baseService = inject(BaseService);

  ngOnInit(): void {
    console.log('Environment API Key:', environment.apiKey);
    console.log('Base API URL:', this.baseService.getBaseApiUrl());

    this.pageDataService.getStartseiteData().subscribe({
      next: (heroData: Hero) => {
        console.log('Success:', heroData);
        this.data = heroData;
      },
      error: (error) => {
        console.error('Error details:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
      },
    });
  }

  getFullImagePath(path: string): string {
    return `${this.baseService.getBaseImagePathUrl()}${path}`;
  }
}
