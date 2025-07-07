import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BaseService } from './base.service';
import { ErrorHandlerService } from './error-handler.service';
import { API_ENDPOINTS } from '../constants/app.constants';
import { PageApiResponse } from '../interfaces/page.interface';

/**
 * Service responsible for fetching page data from the Pages API
 */
@Injectable({
  providedIn: 'root',
})
export class PagesService {
  constructor(
    private readonly http: HttpClient,
    private readonly baseService: BaseService,
    private readonly errorHandler: ErrorHandlerService
  ) {}
  /**
   * Get page data by route slug
   * @param slug - The route slug for the page
   * @returns Observable of PageApiResponse
   */
  getPageByRoute(slug: string): Observable<PageApiResponse> {
    if (!slug?.trim()) {
      throw new Error('Page slug is required');
    }

    // Format the route - ensure it starts with /
    const route = slug.startsWith('/') ? slug : `/${slug}`;
    const endpoint = `${this.baseService.getBaseApiUrl()}${
      API_ENDPOINTS.PAGES.PAGE
    }`;

    return this.http
      .get<PageApiResponse>(endpoint, {
        params: { route },
      })
      .pipe(catchError((error) => this.errorHandler.handleHttpError(error)));
  }

  /**
   * Get page data by ID
   * @param id - The page ID
   * @returns Observable of PageApiResponse
   */
  getPageById(id: string): Observable<PageApiResponse> {
    if (!id?.trim()) {
      throw new Error('Page ID is required');
    }

    const endpoint = `${this.baseService.getBaseApiUrl()}${
      API_ENDPOINTS.PAGES.PAGE
    }/${id}`;

    return this.http
      .get<PageApiResponse>(endpoint)
      .pipe(catchError((error) => this.errorHandler.handleHttpError(error)));
  }

  /**
   * Get page data by route using the routes endpoint
   * @param route - The route for the page (e.g., 'startseite')
   * @returns Observable of PageApiResponse
   */
  getPageByRouteEndpoint(route: string): Observable<PageApiResponse> {
    if (!route?.trim()) {
      throw new Error('Route is required');
    }

    const endpoint = `${this.baseService.getBaseApiUrl()}${
      API_ENDPOINTS.PAGES.ROUTES
    }/${route}`;

    return this.http
      .get<PageApiResponse>(endpoint)
      .pipe(catchError((error) => this.errorHandler.handleHttpError(error)));
  }
}
