export interface ICategory {
  id: number;
  name: string;
}

export interface ICat {
  id: string;
  url: string;
  categories?: Array<ICategory>;
  s: string;
}
