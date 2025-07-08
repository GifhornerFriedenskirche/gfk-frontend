import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Hero } from '../interfaces/hero.interface';
import {
  HomepageCardItem,
  HomepageContentApiResponse,
} from '../interfaces/homepage-content.interface';
import { BaseService } from './base.service';
import { ErrorHandlerService } from './error-handler.service';
import { UtilsService } from './utils.service';
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
    private readonly errorHandler: ErrorHandlerService,
    private readonly utils: UtilsService
  ) {
    this.apiEndpoint = `${this.baseService.getBaseApiUrl()}${
      API_ENDPOINTS.CONTENT.ITEM
    }`;
  }

  /**
   * Get page data by slug
   * @param pageSlug - The slug identifier for the page
   * @returns Observable of Hero data
   * @throws Error if pageSlug is empty
   */
  getPageData(pageSlug: string): Observable<Hero> {
    // Validate input
    const trimmedSlug = pageSlug?.trim();
    if (!trimmedSlug) {
      throw new Error('Page slug is required');
    }

    // Build URL and make request
    const url = `${this.apiEndpoint}/${trimmedSlug}`;
    return this.http.get<Hero>(url).pipe(
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
   * Get homepage content data (tiles/cards)
   * @returns Observable of HomepageContentApiResponse
   */
  getHomepageContentData(): Observable<HomepageContentApiResponse> {
    const modelName = 'homepageContentModel';
    const endpoint = `${this.baseService.getBaseApiUrl()}${API_ENDPOINTS.CONTENT.ITEMS}`;
    const url = `${endpoint}/${modelName}`;

    return this.http.get<unknown>(url).pipe(
      map((response: unknown) => this.transformHomepageResponse(response)),
      catchError((error) => this.errorHandler.handleHttpError(error))
    );
  }

  /**
   * Transform API response to HomepageContentApiResponse format
   * Handles different response formats for backward compatibility
   * @private
   */
  private transformHomepageResponse(
    response: unknown
  ): HomepageContentApiResponse {
    // Case 1: Response is already an array of tiles
    if (Array.isArray(response)) {
      return { tiles: response as HomepageCardItem[] };
    }

    // Case 2: Response is an object with entries or tiles property
    if (response && typeof response === 'object') {
      const responseObj = response as Record<string, unknown>;
      
      // Try 'entries' property first (newer API format)
      if (this.utils.isValidArrayProperty(responseObj, 'entries')) {
        return { tiles: responseObj['entries'] as HomepageCardItem[] };
      }
      
      // Then try 'tiles' property (older API format)
      if (this.utils.isValidArrayProperty(responseObj, 'tiles')) {
        return { tiles: responseObj['tiles'] as HomepageCardItem[] };
      }
    }

    // Default fallback - return empty tiles array
    return { tiles: [] };
  }
}
