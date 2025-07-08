import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PageDataService } from '../../../core/services/page-data.service';
import {
  HomepageContentApiResponse,
  HomepageCardItem,
} from '../../../core/interfaces/homepage-content.interface';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-homepage-content',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './homepage-content.component.html',
  styleUrl: './homepage-content.component.scss',
})
export class HomepageContentComponent {
  private readonly pageDataService = inject(PageDataService);
  private readonly router = inject(Router);
  private _initialLoadComplete = false;

  public content: HomepageContentApiResponse | null = null;
  public isLoading = false;
  public readonly baseApiUrl = environment.apiBaseUrl;
  public hasError = false;

  @Input()
  set initialLoadComplete(value: boolean) {
    this._initialLoadComplete = value;
    if (this._initialLoadComplete) {
      this.deferredLoadContent();
    }
  }

  get initialLoadComplete(): boolean {
    return this._initialLoadComplete;
  }

  /**
   * Defer content loading to next event loop tick for better UI responsiveness
   * @private
   */
  private deferredLoadContent(): void {
    setTimeout(() => this.loadContent(), 0);
  }

  /**
   * Load homepage content data from API
   */
  loadContent(): void {
    this.resetState();
    this.isLoading = true;

    this.pageDataService.getHomepageContentData().subscribe({
      next: (contentData) => {
        this.content = contentData;
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.content = null;
        this.isLoading = false;
      },
    });
  }

  /**
   * Reset component state before loading new data
   * @private
   */
  private resetState(): void {
    this.hasError = false;
  }

  /**
   * Handle tile click for navigation
   * @param tile The tile item that was clicked
   */
  handleTileClick(tile: HomepageCardItem): void {
    const route = tile.tileLink?.trim();
    if (route) {
      this.router.navigate([route]);
    }
  }
}
