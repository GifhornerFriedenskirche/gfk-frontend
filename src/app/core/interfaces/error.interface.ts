/**
 * Application error types and interfaces
 */

export enum ErrorType {
  NETWORK = 'network',
  HTTP = 'http',
  CLIENT = 'client',
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  NOT_FOUND = 'not_found',
  SERVER = 'server',
  UNKNOWN = 'unknown',
}

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export interface AppError {
  message: string;
  type: ErrorType;
  severity?: ErrorSeverity;
  timestamp: Date;
  code?: string | number;
  details?: Record<string, unknown>;
  stack?: string;
  url?: string;
  statusText?: string;
  retryable?: boolean;
}

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  sessionId?: string;
  userAgent?: string;
  additionalData?: Record<string, unknown>;
}

export interface ErrorDisplayOptions {
  showRetry?: boolean;
  showDetails?: boolean;
  autoHide?: boolean;
  hideAfter?: number;
  persistent?: boolean;
}
