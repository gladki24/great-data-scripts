import * as cheerio from 'cheerio';
import {ECategory} from './Enums';
import {EBrand} from './Enums';
import {GR8_Abstract} from './GR8_Abstract';
import {IProduct} from './Interfaces';

export class GR8_Carry extends GR8_Abstract {
  public async getProducts(url: string, category: ECategory): Promise<IProduct[]> {
    const products: IProduct[] = [];
    const body = await this.getBody(url);

    const $ = cheerio.load(body);
    const productsTable = $('ul#product_list li');
    const productsNumber = $(productsTable).length;

    for (let index = 0; index < productsNumber; index++) {
      const title = $(productsTable[index]).find('h3 a').first().text();
      const link = $(productsTable[index]).find('h3 a').first().attr('href');
      const price = parseFloat($(productsTable[index]).find('span.price').first().text().replace(',', '.'));
      const image_source = $(productsTable[index]).find('a.product_img_link img').first().attr('src');
      const id = 'CY-' + link.slice(link.lastIndexOf('/') + 1, link.lastIndexOf('-'));

      if (!title || !link || !id) {
        continue;
      }

      const product: IProduct = {
        id,
        title,
        price,
        link,
        image_source,
        brand_id: EBrand.Carry,
        category_id: category,
      };
      products.push(product);
    }
    return products;
  }
}
