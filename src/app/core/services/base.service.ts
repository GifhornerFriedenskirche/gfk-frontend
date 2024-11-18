import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  baseImagePathUrl: string =
    'https://content-dev.gifhorner-friedenskirche.de/storage/uploads/';
  private apiKey = 'API-43159f30f2b8492f50ee9dbedbf4dca649d67fb0';

  constructor() {}

  getBaseImagePathUrl(): string {
    return this.baseImagePathUrl;
  }
  getAPIKey(): string {
    return this.apiKey;
  }
}
