import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
   * Get navigation menus data
   * @returns Observable of navigation menus
   */
  getNavigationMenus(): Observable<NavigationMenu[]> {
    return this.http.get<NavigationMenu[]>(this.navigationMenusAPI)
      .pipe(
        map(data => this.validateNavigationMenus(data)),
        catchError(error => this.errorHandler.handleHttpError(error))
      );
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
