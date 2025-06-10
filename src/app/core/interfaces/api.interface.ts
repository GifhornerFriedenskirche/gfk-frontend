/**
 * Configuration options for HTTP requests
 */
export interface HttpRequestConfig {
  retries?: number;
  timeout?: number;
  cache?: boolean;
}

/**
 * API response wrapper for better error handling
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: Date;
}

/**
 * Error details for API responses
 */
export interface ApiError {
  message: string;
  status: number;
  statusText: string;
  url: string;
  timestamp: Date;
  type: 'network' | 'server' | 'client' | 'unknown';
}
