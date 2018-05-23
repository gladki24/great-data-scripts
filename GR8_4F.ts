import * as cheerio from 'cheerio';
import {ECategory} from './Enums';
import {EBrand} from './Enums';
import {GR8_Abstract} from './GR8_Abstract';
import {IProduct} from './Interfaces';

export class GR8_4F extends GR8_Abstract {
  public async getProducts(url: string, category: ECategory): Promise<IProduct[]> {
    // array for products
    const products: IProduct[] = [];
    // start page
    const body: CheerioElement = await this.getBody(url);
    // jQuery
    const $ = cheerio.load(body);
    // counting how many pages of products there are
    let pageNumber = parseInt($('.pagination_box')
      .first()
      .children('span')
      .last()
      .text()
      .slice(1)
      .trim(), 0);
    // if we have more than one page
    if (pageNumber > 1) {
      console.log('More than one page');
      // get data from all of pages
      for (let page = 1; page <= pageNumber; page++) {
        // create a url to find all products of all pages
        const params = url.slice(url.lastIndexOf('5f3') + 4).split('');
        params[0] = page.toString();
        const pageUrl = url.slice(0, url.lastIndexOf('5f3') + 4) + params.join('');
        const pageBody = await this.getBody(pageUrl);
        // load next page
        const $ = cheerio.load(pageBody);
        const productsTable = $('div.product_box');
        const productsNumber = $(productsTable).length;
        // get product detail
        for (let index = 0; index < productsNumber; index++) {
          const detailsBox = $(productsTable[index]).find('h4 a');
          const title = $(detailsBox).attr('title');
          const price = parseInt($(productsTable[index]).find('.box_price').first().text().trim(), 0);
          const link = 'https://4f.com.pl/' + $(detailsBox).attr('href');
          const imgSrc = 'https://4f.com.pl/' + $(productsTable[index]).find('img').first().attr('src');
          const id = this.set4fId(imgSrc);
          // if not data, don't add to table
          if (!title || !link || !id) {
            continue;
          }
          // IProduct object
          const product: IProduct = {
            id,
            title,
            price,
            link,
            image_source: imgSrc,
            brand_id: EBrand.FourF,
            category_id: category,
          };
          products.push(product);
        }
      }
      return products;
    } else {
      console.log('One page');
      // If we have only one page
      const productsTable = $('div.product_box');
      const productsNumber = $(productsTable).length;

      for (let index = 0; index < productsNumber; index++) {
        const detailsBox = $(productsTable[index]).find('h4 a');
        const title = $(detailsBox).attr('title');
        const price = parseInt($(productsTable[index]).find('.box_price').first().text().trim(), 0);
        const link = 'https://4f.com.pl/' + $(detailsBox).attr('href');
        const imgSrc = 'https://4f.com.pl/' + $(productsTable[index]).find('img').first().attr('src');
        const id = this.set4fId(imgSrc);

        if (!title || !link || !id) {
          continue;
        }

        const product: IProduct = {
          id,
          title,
          price,
          link,
          image_source: imgSrc,
          brand_id: EBrand.FourF,
          category_id: category,
        };
        products.push(product);
        // console.log(product);
      }
      return products;
    }
  }

  private set4fId(hiddenId: string): string {
    hiddenId = hiddenId.slice(hiddenId.indexOf('gfx/') + 4, hiddenId.indexOf('.jpg') - 5);
    return hiddenId;
  }
}
