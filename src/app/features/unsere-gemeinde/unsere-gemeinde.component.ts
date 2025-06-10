import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Hero } from '../../core/interfaces/hero.interface';
import { PageDataService } from '../../core/services/page-data.service';
import { BasePageComponent } from '../../shared/components/base-page.component';

@Component({
  selector: 'app-unsere-gemeinde',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unsere-gemeinde.component.html',
})
export class UnsereGemeindeComponent extends BasePageComponent implements OnInit {
  data!: Hero;

  private readonly pageDataService = inject(PageDataService);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.resetErrorState();    this.pageDataService.getUnsereGemeindeData().subscribe({
      next: (heroData: Hero) => {
        this.data = heroData;
      },
      error: (error) => {
        this.setErrorState(error);
      },
    });
  }
}
