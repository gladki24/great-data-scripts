import {EBrand} from "./Enums";
import {ECategory} from "./Enums";

export interface IProduct {
  id: string;
  title: string;
  price: number;
  image_source: string;
  link: string;
  brand_id: EBrand;
  category_id: ECategory;
}

export interface IProductFactory {
  getBody: (url: string) => Promise<CheerioElement>;
  getProducts: (url: string, category: ECategory) => Promise<IProduct[]>;
}
