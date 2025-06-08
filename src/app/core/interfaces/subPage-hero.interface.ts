export interface SubHero {
  breadcrumb_title: string;
  heroParagraph: string;
  HeroLink: string;
  heroLink: null;
  buttonTitle: string;
  text: string;
  link: null;
  header_image: Header_image;
}

export interface Header_image {
  path: string;
  title: string;
  mime: string;
  type: string;
  description: string;
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
}
