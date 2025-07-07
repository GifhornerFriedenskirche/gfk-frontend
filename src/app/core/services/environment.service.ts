import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Service for managing environment variables and configuration
 */
@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  /**
   * Get API base URL
   */
  get apiBaseUrl(): string {
    return environment.apiBaseUrl;
  }

  /**
   * Check if application is in production mode
   */
  get isProduction(): boolean {
    return environment.production;
  }

  /**
   * Get full API endpoint URL
   */
  getApiEndpoint(endpoint: string): string {
    return `${this.apiBaseUrl}${endpoint}`;
  }

  /**
   * Get storage upload URL
   */
  getStorageUrl(path: string): string {
    return `${this.apiBaseUrl}/storage/uploads${path}`;
  }

  /**
   * Get environment variable with fallback
   */
  getEnvVar(key: keyof typeof environment, fallback?: string): string {
    return environment[key] as string || fallback || '';
  }

  /**
   * Check if feature flag is enabled
   */
  isFeatureEnabled(featureName: string): boolean {
    const envRecord = environment as Record<string, unknown>;
    const features = envRecord['features'] as Record<string, boolean> || {};
    return features[featureName] === true;
  }
}
