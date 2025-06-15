import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Hero } from '../interfaces/hero.interface';
import {
  HomepageCardItem,
  HomepageContentApiResponse,
} from '../interfaces/homepage-content.interface'; // Added import
import { BaseService } from './base.service';
import { ErrorHandlerService } from './error-handler.service';
import { API_ENDPOINTS, PAGE_SLUGS } from '../constants/app.constants';

/**
 * Service responsible for fetching page data from the API
 */
@Injectable({
  providedIn: 'root',
})
export class PageDataService {
  private readonly apiEndpoint: string;

  constructor(
    private readonly http: HttpClient,
    private readonly baseService: BaseService,
    private readonly errorHandler: ErrorHandlerService
  ) {
    this.apiEndpoint = `${this.baseService.getBaseApiUrl()}${
      API_ENDPOINTS.CONTENT.ITEM
    }`;
  }

  /**
   * Get page data by slug
   * @param pageSlug - The slug identifier for the page
   * @returns Observable of Hero data
   */
  getPageData(pageSlug: string): Observable<Hero> {
    if (!pageSlug?.trim()) {
      throw new Error('Page slug is required');
    }

    return this.http.get<Hero>(`${this.apiEndpoint}/${pageSlug}`).pipe(
      // map((data) => this.validateHeroData(data)), // Removed problematic line
      catchError((error) => this.errorHandler.handleHttpError(error))
    );
  }

  /**
   * Get home page (Startseite) data
   * @returns Observable of Hero data
   */
  getHomePageData(): Observable<Hero> {
    return this.getPageData(PAGE_SLUGS.HOME);
  }
  /**
   * Get homepage content data
   * @returns Observable of HomepageContentApiResponse
   */ getHomepageContentData(): Observable<HomepageContentApiResponse> {
    const modelName = 'homepageContentModel';
    // Use the correct ITEMS endpoint instead of ITEM
    const endpoint = `${this.baseService.getBaseApiUrl()}${
      API_ENDPOINTS.CONTENT.ITEMS
    }`;

    return this.http.get<unknown>(`${endpoint}/${modelName}`).pipe(
      map((response: unknown) => {
        console.log('API response for homepage content:', response);

        // Since we now know the response is an array of tile objects
        if (Array.isArray(response)) {
          console.log('Response is an array with', response.length, 'tiles');
          return {
            tiles: response as HomepageCardItem[],
          } as HomepageContentApiResponse;
        } else if (response && typeof response === 'object') {
          const responseObj = response as Record<string, unknown>;
          // Check if response has entries array
          if (responseObj['entries'] && Array.isArray(responseObj['entries'])) {
            const entries = responseObj['entries'] as unknown[];
            console.log(
              'Response has entries array with',
              entries.length,
              'tiles'
            );
            return {
              tiles: entries as HomepageCardItem[],
            } as HomepageContentApiResponse;
          }
          // Check if response already has tiles array
          else if (
            responseObj['tiles'] &&
            Array.isArray(responseObj['tiles'])
          ) {
            const tiles = responseObj['tiles'] as unknown[];
            console.log(
              'Response already has tiles array with',
              tiles.length,
              'items'
            );
            return {
              tiles: tiles as HomepageCardItem[],
            } as HomepageContentApiResponse;
          }
        }

        // Default case if response format doesn't match any expected pattern
        console.log('Unexpected response format, returning empty tiles array');
        return { tiles: [] } as HomepageContentApiResponse;
      }),
      catchError((error) => this.errorHandler.handleHttpError(error))
    );
  }

  // Removed validateHeroData method as it's not defined and not relevant to the current task.
}
