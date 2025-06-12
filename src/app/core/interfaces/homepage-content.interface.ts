export interface HomepageImage {
  path: string;
  title: string;
  mime: string;
}

export interface HomepageCardItem {
  tiletitle: string;
  tileText: string;
  tileImage: HomepageImage;
}

// This alias assumes the API endpoint for 'homepageContentModel' directly returns a single card item.
// If it were to return an array or a more complex object, this would need to be adjusted.
export type HomepageContentApiResponse = HomepageCardItem;
