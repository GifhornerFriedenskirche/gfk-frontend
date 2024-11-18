import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private startseiteAPI =
    'https://content-dev.gifhorner-friedenskirche.de/api/content/item/Startseite';
  constructor(private http: HttpClient, private baseService: BaseService) {}

  getHeroData(): Observable<Hero> {
    const headers = new HttpHeaders({
      'api-key': this.baseService.getAPIKey(),
    });

    return this.http.get<Hero>(this.startseiteAPI, {
      headers,
    });
  }
}
