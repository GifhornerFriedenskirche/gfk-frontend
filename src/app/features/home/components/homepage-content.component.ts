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
   * Defer content loading to next event loop tick
   * @private
   */
  private deferredLoadContent(): void {
    setTimeout(() => this.loadContent(), 0);
  }

  /**
   * Load homepage content data
   */
  loadContent(): void {
    this.resetState();
    this.setLoadingState(true);

    this.pageDataService.getHomepageContentData().subscribe({
      next: (contentData) => this.handleContentSuccess(contentData),
      error: () => this.handleContentError(),
    });
  }

  /**
   * Reset component state
   * @private
   */
  private resetState(): void {
    this.hasError = false;
  }

  /**
   * Set loading state with proper change detection
   * @private
   */
  private setLoadingState(loading: boolean): void {
    setTimeout(() => {
      this.isLoading = loading;
    }, 0);
  }

  /**
   * Handle successful content loading
   * @private
   */
  private handleContentSuccess(contentData: HomepageContentApiResponse): void {
    setTimeout(() => {
      this.content = contentData;
      this.isLoading = false;
    }, 0);
  }

  /**
   * Handle content loading error
   * @private
   */
  private handleContentError(): void {
    setTimeout(() => {
      this.hasError = true;
      this.content = null;
      this.isLoading = false;
    }, 0);
  }

  /**
   * Handle tile click for navigation
   */
  handleTileClick(tile: HomepageCardItem): void {
    if (tile.tileLink) {
      // Use programmatic navigation to ensure proper route handling
      this.router.navigate([tile.tileLink]);
    }
  }
}
