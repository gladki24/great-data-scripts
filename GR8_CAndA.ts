import {GR8_Abstract} from './GR8_Abstract';
import {ECategory} from './Enums';
import {EBrand} from './Enums';
import {IProduct} from './Interfaces';
import * as cheerio from 'cheerio';

export class GR8_CAndA extends GR8_Abstract {
  public async getProducts(url: string, category: ECategory): Promise<IProduct[]> {
    // array for products
    const products: IProduct[] = [];

    if (url.indexOf('?') === -1) { url += '?pagesize=&pagenumber=1'; }
    // jQuery
    let $ = cheerio.load(await this.getBody(url));

    // read how many products are
    let productsNumber: any = $('div.toggle__header')
      .first()
      .find('a')
      .first()
      .html()
      .trim();
    productsNumber = parseInt(productsNumber.substr(productsNumber.indexOf('(') + 1, productsNumber.indexOf(')')), 10);
    // Create url to request data of all products
    const insertPosition = url.lastIndexOf('pagesize=') + 'pagesize='.length;
    const allProductsPageUrl = url.slice(0, insertPosition) + productsNumber + url.slice(insertPosition);
    $ = cheerio.load(await this.getBody(allProductsPageUrl));

    const productsTable = $('div.product-tile');
    for (let index = 0; index <= productsNumber; index++) {
      const title = $(productsTable[index]).find('h4.product-tile__title').first().text();
      const price = parseFloat($(productsTable[index]).find('div.product-tile__price')
        .first()
        .text()
        .trim()
        .slice(4)
        .replace(',', '.'));
      let imgSrc = $(productsTable[index]).find('div.product-tile__img-wrapper noscript').html().trim();
      imgSrc = imgSrc.slice(imgSrc.indexOf('src="') + 'src="'.length, imgSrc.indexOf('"\n'));
      const link = $(productsTable[index]).find('a').first().attr('href');
      const id = 'CA-' + imgSrc.slice(imgSrc.lastIndexOf('/') + 1, imgSrc.indexOf('.jpg') - 5);

      if (!title || !link || !id) { continue; }

      const product: IProduct = {
        id,
        title,
        price,
        link,
        image_source: imgSrc,
        brand_id: EBrand.CAndA,
        category_id: category,
      };
      products.push(product);
    }
    return products;
  }
}
