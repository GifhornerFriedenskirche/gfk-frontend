import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private readonly baseImagePathUrl = `${environment.apiBaseUrl}${API_ENDPOINTS.STORAGE.UPLOADS}/`;
  private readonly baseApiUrl = environment.apiBaseUrl;

  getBaseImagePathUrl(): string {
    return this.baseImagePathUrl;
  }

  getBaseApiUrl(): string {
    return this.baseApiUrl;
  }
}
