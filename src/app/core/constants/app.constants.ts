/**
 * Application-wide constants
 */

// API Endpoints
export const API_ENDPOINTS = {
  CONTENT: {
    ITEM: '/api/content/item',
    ITEMS: '/api/content/items',
  },
  PAGES: {
    PAGES: '/api/pages/pages',
    MENUS: '/api/pages/menus',
  },
  STORAGE: {
    UPLOADS: '/storage/uploads',
  },
} as const;

// Page Slugs
export const PAGE_SLUGS = {
  HOME: 'Startseite',
  COMMUNITY: 'UnsereGemeinde',
} as const;

// Loading and Error Messages
export const MESSAGES = {
  LOADING: {
    DEFAULT: 'Lädt...',
    DATA: 'Daten werden geladen...',
    NAVIGATION: 'Navigation wird geladen...',
  },
  ERROR: {
    DEFAULT: 'Ein Fehler ist aufgetreten.',
    NETWORK: 'Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.',
    DATA_LOAD: 'Fehler beim Laden der Daten.',
    NAVIGATION_LOAD: 'Fehler beim Laden der Navigation.',
    INVALID_DATA: 'Ungültige Daten erhalten.',
  },
  SUCCESS: {
    DATA_LOADED: 'Daten erfolgreich geladen.',
  },
} as const;

// Notification Durations (in milliseconds)
export const NOTIFICATION_DURATION = {
  SUCCESS: 5000,
  INFO: 5000,
  WARNING: 6000,
  ERROR: 8000,
} as const;

// HTTP Configuration
export const HTTP_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  RETRIES: 3,
} as const;
