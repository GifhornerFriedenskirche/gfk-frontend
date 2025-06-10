import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap, shareReplay } from 'rxjs/operators';

import { BaseService } from './base.service';
import { ErrorHandlerService } from './error-handler.service';
import { NavigationMenu } from '../interfaces/menu.interface';
import { API_ENDPOINTS, MESSAGES } from '../constants/app.constants';

/**
 * Service responsible for fetching navigation data from the API
 */
@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly navigationPagesAPI: string;
  private readonly navigationMenusAPI: string;
  
  // Cache for navigation menus
  private navigationMenusCache$: Observable<NavigationMenu[]> | null = null;
  private navigationMenusSubject = new BehaviorSubject<NavigationMenu[]>([]);
  
  /**
   * Observable that emits the cached navigation menus
   */
  public readonly navigationMenus$ = this.navigationMenusSubject.asObservable();

  constructor(
    private readonly http: HttpClient, 
    private readonly baseService: BaseService,
    private readonly errorHandler: ErrorHandlerService
  ) {
    const baseApiUrl = this.baseService.getBaseApiUrl();
    this.navigationPagesAPI = `${baseApiUrl}${API_ENDPOINTS.PAGES.PAGES}`;
    this.navigationMenusAPI = `${baseApiUrl}${API_ENDPOINTS.PAGES.MENUS}`;
  }

  /**
   * Get navigation pages data
   * @returns Observable of navigation pages
   */
  getNavigationPages(): Observable<unknown> {
    return this.http.get(this.navigationPagesAPI)
      .pipe(
        catchError(error => this.errorHandler.handleHttpError(error))
      );
  }
  /**
   * Get navigation menus data with caching
   * @returns Observable of navigation menus
   */
  getNavigationMenus(): Observable<NavigationMenu[]> {
    // Return cached data if available
    if (this.navigationMenusCache$) {
      return this.navigationMenusCache$;
    }

    // Create and cache the request
    this.navigationMenusCache$ = this.http.get<NavigationMenu[]>(this.navigationMenusAPI)
      .pipe(
        map(data => this.validateNavigationMenus(data)),
        tap(menus => this.navigationMenusSubject.next(menus)),
        shareReplay(1), // Cache the result
        catchError(error => {
          // Reset cache on error to allow retry
          this.navigationMenusCache$ = null;
          return this.errorHandler.handleHttpError(error);
        })
      );

    return this.navigationMenusCache$;
  }

  /**
   * Get cached navigation menus (synchronous access to last cached value)
   * @returns Current cached navigation menus
   */
  getCachedNavigationMenus(): NavigationMenu[] {
    return this.navigationMenusSubject.value;
  }

  /**
   * Clear navigation cache (useful for refresh scenarios)
   */
  clearCache(): void {
    this.navigationMenusCache$ = null;
    this.navigationMenusSubject.next([]);
  }

  /**
   * Validate navigation menus data structure
   * @private
   */
  private validateNavigationMenus(data: unknown): NavigationMenu[] {
    if (!Array.isArray(data)) {
      throw new Error(MESSAGES.ERROR.INVALID_DATA);
    }
    return data;
  }
}
