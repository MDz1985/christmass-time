export interface iiCard{
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: string;
}

export interface ICard{
[index:string]:string
}

export interface ILocalStorage {
  data: ICard[];
  garland: string,
  favorite: string[],
  name: string,
  counts: string[],
  years: string[],
  shape: string[],
  color: string[],
  size: string[],
  tree: string,
  sort: string[],
  bg: string,
  volume: string,
  url: string,
  toysUrl: string,
  treesUrl: string,
  bgUrl: string,
  toysProperties: string[],
  chosen: number,
  snowfall: string,
  sizesArray: string[],
  colorsArray: string[],
  shapesArray: string[],
}
