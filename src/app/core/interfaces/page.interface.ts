// Interface for the Pages API response structure

export interface PageSeo {
  title: string | null;
  keywords: string | null;
  description: string | null;
}

export interface PageLayoutComponentData {
  url?: string;
  caption?: string;
  target?: string | null;
  asset?: {
    path: string;
    title: string;
    mime: string;
    type: string;
    description: string;
    tags: string[];
    size: number;
    colors: string[];
    width: number;
    height: number;
    _hash: string;
    _created: number;
    _modified: number;
    _cby: string;
    thumbhash: string;
    folder: string;
    _id: string;
  };
  [key: string]: unknown;
}

export interface PageLayoutComponent {
  id: string;
  component: string;
  label: string;
  children: unknown;
  data: PageLayoutComponentData;
  hidden?: boolean;
}

export interface PageLayout {
  before?: PageLayoutComponent[];
  after?: PageLayoutComponent[] | null;
}

export interface PageSingletonData {
  stageImage: {
    path: string;
    title: string;
    mime: string;
    type: string;
    description: string;
    tags: string[];
    size: number;
    colors: string[];
    width: number;
    height: number;
    _hash: string;
    _created: number;
    _modified: number;
    _cby: string;
    thumbhash: string;
    folder: string;
    _id: string;
  };
  header_image: {
    path: string;
    title: string;
    mime: string;
    type: string;
    description: string;
    tags: string[];
    size: number;
    colors: string[];
    width: number;
    height: number;
    _hash: string;
    _created: number;
    _modified: number;
    _cby: string;
    thumbhash: string;
    folder: string;
    _id: string;
  };
  breadcrumb_title: string;
  _modified: number;
  _mby: string;
  _created: number;
  _state: number;
  _cby: string;
}

export interface PageData {
  singleton: string;
  catchSubSlugs: boolean;
  layout: PageLayout;
  data: PageSingletonData;
  params: unknown;
}

export interface PageApiResponse {
  type: string;
  title: string;
  slug: string;
  seo: PageSeo;
  data: PageData;
  _meta: unknown[];
  _locales: unknown[];
  _state: number;
  _r: string;
  _pid: string | null;
  _o: number;
  _modified: number;
  _mby: string;
  _created: number;
  _cby: string;
  _id: string;
  _locale: string;
  _routes: {
    [key: string]: string;
  };
  _parents: unknown[];
}
