import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private http: HttpClient, private baseService: BaseService) {}

  getHeroData(): Observable<Hero> {
    // Remove manual headers - interceptor will add them
    return this.http.get<Hero>(
      `${this.baseService.getBaseApiUrl()}/api/content/item/Startseite`
    );
  }
}
