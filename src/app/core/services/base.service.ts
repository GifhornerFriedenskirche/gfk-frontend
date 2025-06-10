import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private baseImagePathUrl = `${environment.apiBaseUrl}/storage/uploads/`;

  constructor() {}

  getBaseImagePathUrl(): string {
    return this.baseImagePathUrl;
  }

  getBaseApiUrl(): string {
    return environment.apiBaseUrl;
  }

  // Add this back temporarily
  getAPIKey(): string {
    return environment.apiKey;
  }
}
