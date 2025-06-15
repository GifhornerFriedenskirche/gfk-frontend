import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageDataService } from '../../../core/services/page-data.service';
import { HomepageContentApiResponse } from '../../../core/interfaces/homepage-content.interface';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-homepage-content',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
        console.log('Component received content data:', contentData);
        if (contentData && contentData.tiles) {
          console.log('Number of tiles received:', contentData.tiles.length);

          // Log the complete tiles data for debugging
          if (contentData.tiles.length > 0) {
            console.log(
              'Tiles data sample (first tile):',
              JSON.stringify(contentData.tiles[0], null, 2)
            );

            // Log the properties available in each tile
            const firstTile = contentData.tiles[0];
            console.log('First tile properties:', Object.keys(firstTile));

            // Make sure all required properties are available or have fallbacks in template
            const requiredProps = ['tiletitle', 'tileText', 'tileImage'];
            requiredProps.forEach((prop) => {
              console.log(`Tile has ${prop}?`, prop in firstTile);
            });
          } else {
            console.log('No tiles found in content data array');
          }
        } else {
          console.log('No tiles array found in content data');
        }

        // Use setTimeout to ensure state changes after change detection cycle
        setTimeout(() => {
          this.content = contentData;
          console.log(
            'Content set in component with',
            contentData?.tiles?.length || 0,
            'tiles'
          );
          this.isLoading = false;
        });
      },
      error: (err) => {
        console.error('Error loading homepage content:', err);
        setTimeout(() => {
          this.hasError = true;
          this.content = null;
          this.isLoading = false;
        });
      },
    });
  }
}
