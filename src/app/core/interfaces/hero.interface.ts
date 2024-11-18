export interface Hero {
  title: string;
  heroParagraph: string;
  HeroLink: string;
  heroLink: null;
  buttonTitle: string;
  text: string;
  link: null;
  image: Image;
}

export interface Image {
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
