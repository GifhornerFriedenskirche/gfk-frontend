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
   */
  getHomepageContentData(): Observable<HomepageContentApiResponse> {
    const modelName = 'homepageContentModel';
    const endpoint = `${this.baseService.getBaseApiUrl()}${
      API_ENDPOINTS.CONTENT.ITEMS
    }`;

    return this.http.get<unknown>(`${endpoint}/${modelName}`).pipe(
      map((response: unknown) => this.transformHomepageResponse(response)),
      catchError((error) => this.errorHandler.handleHttpError(error))
    );
  }

  /**
   * Transform API response to HomepageContentApiResponse format
   * @private
   */
  private transformHomepageResponse(
    response: unknown
  ): HomepageContentApiResponse {
    // Handle array response (direct tiles)
    if (Array.isArray(response)) {
      return { tiles: response as HomepageCardItem[] };
    }

    // Handle object response
    if (response && typeof response === 'object') {
      const responseObj = response as Record<string, unknown>;

      // Check for entries array
      if (this.isValidArrayProperty(responseObj, 'entries')) {
        return { tiles: responseObj['entries'] as HomepageCardItem[] };
      }

      // Check for tiles array
      if (this.isValidArrayProperty(responseObj, 'tiles')) {
        return { tiles: responseObj['tiles'] as HomepageCardItem[] };
      }
    }

    // Default fallback
    return { tiles: [] };
  }

  /**
   * Check if object property exists and is a valid array
   * @private
   */
  private isValidArrayProperty(
    obj: Record<string, unknown>,
    property: string
  ): boolean {
    return (
      obj[property] !== undefined &&
      obj[property] !== null &&
      Array.isArray(obj[property])
    );
  }

  // Removed validateHeroData method as it's not defined and not relevant to the current task.
}
