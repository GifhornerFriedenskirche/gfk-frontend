import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { PagesService } from '../../core/services/pages.service';
import { BasePageComponent } from '../../shared/components/base-page.component';
import { PageApiResponse } from '../../core/interfaces/page.interface';

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
  pageData!: PageApiResponse;
  isLoading: boolean = true;

  private readonly pagesService = inject(PagesService);

  ngOnInit(): void {
    // Defer loadData to the next macrotask (event loop tick)
    // to prevent ExpressionChangedAfterItHasBeenCheckedError.
    setTimeout(() => this.loadData(), 0);
  }  loadData(): void {
    this.resetErrorState();
    this.isLoading = true;
    
    const pageSlug = 'unsere-gemeinde';
    console.log('Loading page data for slug:', pageSlug);

    this.pagesService.getPageByRoute(pageSlug).subscribe({
      next: (pageResponse: PageApiResponse) => {
        console.log('Page API Response:', pageResponse);
        console.log('Page title:', pageResponse.title);
        console.log('Page layout:', pageResponse.data.layout);
        console.log('Singleton data:', pageResponse.data.data);
        
        this.pageData = pageResponse;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching page data:', error);
        console.error('Error details:', {
          status: error.status,
          message: error.message,
          url: error.url,
        });
        this.setErrorState(error);
        this.isLoading = false;
      },
    });
  }
}
