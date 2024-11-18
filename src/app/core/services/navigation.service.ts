import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { NavigationMenu } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private navigationPagesAPI =
    'https://content-dev.gifhorner-friedenskirche.de/api/pages/pages';
  private navigationMenusAPI =
    'https://content-dev.gifhorner-friedenskirche.de/api/pages/menus';

  constructor(private http: HttpClient, private baseService: BaseService) {}

  getNavigationPages(): Observable<unknown> {
    const headers = new HttpHeaders({
      'api-key': this.baseService.getAPIKey(),
    });

    return this.http.get(this.navigationPagesAPI, { headers });
  }
  getNavigationMenus(): Observable<NavigationMenu[]> {
    const headers = new HttpHeaders({
      'api-key': this.baseService.getAPIKey(),
    });

    return this.http.get<NavigationMenu[]>(this.navigationMenusAPI, {
      headers,
    });
  }
}
