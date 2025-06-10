import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class PageDataService {
  constructor(private http: HttpClient, private baseService: BaseService) {}

  getPageData(pageSlug: string): Observable<Hero> {
    // No headers needed - interceptor will add the API key
    return this.http.get<Hero>(
      `${this.baseService.getBaseApiUrl()}/api/content/item/${pageSlug}`
    );
  }

  getStartseiteData(): Observable<Hero> {
    return this.getPageData('Startseite');
  }

  getUnsereGemeindeData(): Observable<Hero> {
    return this.getPageData('UnsereGemeinde');
  }
}
