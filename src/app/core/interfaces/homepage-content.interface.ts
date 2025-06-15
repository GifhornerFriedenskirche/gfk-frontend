export interface HomepageImage {
  path: string;
  title: string;
  mime: string;
  size?: number;
  width?: number;
  height?: number;
}

export interface HomepageCardItem {
  // Properties matching the exact API response
  tiletitle: string;
  tileText: string;
  tileImage?: HomepageImage;
  // Support for alternative property names that might be in the API response
  title?: string;
  text?: string;
  description?: string;
  image?: HomepageImage;
  tileLink?: string | null;
  // Standard CMS properties
  _id: string;
  _created: number;
  _modified: number;
  _state: number;
  _mby?: string;
  _by?: string;
}

// Updated to support multiple cards
export interface HomepageContentApiResponse {
  tiles: HomepageCardItem[];
}
