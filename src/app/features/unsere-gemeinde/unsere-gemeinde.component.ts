import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http'; // Added import

import { Hero } from '../../core/interfaces/hero.interface';
import { PageDataService } from '../../core/services/page-data.service';
import { BasePageComponent } from '../../shared/components/base-page.component';

@Component({
  selector: 'app-unsere-gemeinde',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unsere-gemeinde.component.html',
})
export class UnsereGemeindeComponent
  extends BasePageComponent
  implements OnInit
{
  data!: Hero;

  private readonly pageDataService = inject(PageDataService);

  ngOnInit(): void {
    // Defer loadData to the next macrotask (event loop tick)
    // to prevent ExpressionChangedAfterItHasBeenCheckedError.
    setTimeout(() => this.loadData(), 0);
  }

  loadData(): void {
    this.resetErrorState();
    this.pageDataService.getPageData('unsere-gemeinde').subscribe({
      // Changed to getPageData with slug
      next: (heroData: Hero) => {
        this.data = heroData;
      },
      error: (error: HttpErrorResponse) => {
        // Added HttpErrorResponse type
        this.setErrorState(error);
      },
    });
  }
}
