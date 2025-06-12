import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageDataService } from '../../../core/services/page-data.service';
import { HomepageContentApiResponse } from '../../../core/interfaces/homepage-content.interface';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-homepage-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage-content.component.html',
  styleUrl: './homepage-content.component.scss',
})
export class HomepageContentComponent {
  private pageDataService = inject(PageDataService);
  private _initialLoadComplete = false;

  @Input()
  set initialLoadComplete(value: boolean) {
    this._initialLoadComplete = value;
    if (this._initialLoadComplete) {
      // Defer loading to next JavaScript event loop
      setTimeout(() => {
        this.loadContent();
      });
    }
  }

  get initialLoadComplete(): boolean {
    return this._initialLoadComplete;
  }

  public content: HomepageContentApiResponse | null = null;
  public isLoading = false; // Local loading state instead of using the shared service
  public baseApiUrl = environment.apiBaseUrl;
  public hasError = false;
  loadContent(): void {
    this.hasError = false;
    // Use setTimeout to ensure isLoading is set after change detection cycle
    setTimeout(() => {
      this.isLoading = true;
    });

    this.pageDataService.getHomepageContentData().subscribe({
      next: (contentData) => {
        // Use setTimeout to ensure state changes after change detection cycle
        setTimeout(() => {
          this.content = contentData;
          this.isLoading = false;
        });
      },
      error: () => {
        setTimeout(() => {
          this.hasError = true;
          this.content = null;
          this.isLoading = false;
        });
      },
    });
  }
}
