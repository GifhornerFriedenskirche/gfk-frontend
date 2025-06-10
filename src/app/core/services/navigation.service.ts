import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { NavigationMenu } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private navigationPagesAPI = `${this.baseService.getBaseApiUrl()}/api/pages/pages`;
  private navigationMenusAPI = `${this.baseService.getBaseApiUrl()}/api/pages/menus`;

  constructor(private http: HttpClient, private baseService: BaseService) {}

  getNavigationPages(): Observable<unknown> {
    // No need to manually add headers - interceptor handles it
    return this.http.get(this.navigationPagesAPI);
  }

  getNavigationMenus(): Observable<NavigationMenu[]> {
    // No need to manually add headers - interceptor handles it
    return this.http.get<NavigationMenu[]>(this.navigationMenusAPI);
  }
}
