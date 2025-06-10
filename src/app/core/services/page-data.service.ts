import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Hero } from '../interfaces/hero.interface';
import { BaseService } from './base.service';
import { ErrorHandlerService } from './error-handler.service';
import {
  API_ENDPOINTS,
  PAGE_SLUGS,
  MESSAGES,
} from '../constants/app.constants';

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
      map((data) => this.validateHeroData(data)),
      catchError((error) => this.errorHandler.handleHttpError(error))
    );
  }

  /**
   * Get home page (Startseite) data
   */
  getStartseiteData(): Observable<Hero> {
    return this.getPageData(PAGE_SLUGS.HOME);
  }

  /**
   * Get community page (Unsere Gemeinde) data
   */
  getUnsereGemeindeData(): Observable<Hero> {
    return this.getPageData(PAGE_SLUGS.COMMUNITY);
  }
  /**
   * Validate hero data structure
   * @private
   */
  private validateHeroData(data: unknown): Hero {
    if (!data || typeof data !== 'object') {
      throw new Error(MESSAGES.ERROR.INVALID_DATA);
    }
    return data as Hero;
  }
}
