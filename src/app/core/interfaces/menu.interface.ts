export interface NavigationMenu {
  name: string;
  label: string;
  info: string;
  group: string;
  color: string;
  links: Link[];
  _modified: number;
  _mby: string;
  _created: number;
  _cby: string;
  _id: string;
}

export interface Link {
  active: boolean;
  title: string;
  url: Url;
  target: string;
  data: Data;
  children: Link[];
  meta: unknown[];
}

export interface Url {
  route: string;
  locale: string;
}

export interface Data {
  image: unknown;
}
