import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private apiUrl =
    'https://content-dev.gifhorner-friedenskirche.de/api/pages/menus';
  private apiKey = 'API-43159f30f2b8492f50ee9dbedbf4dca649d67fb0';

  constructor(private http: HttpClient) {}

  getNavigation(): Observable<unknown> {
    const headers = new HttpHeaders({
      'api-key': this.apiKey,
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
