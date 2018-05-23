import {URL} from 'url';
import {ECategory} from './Enums';
import {GR8_4F} from './GR8_4F';
import {GR8_CAndA} from './GR8_CAndA';
import {GR8_Carry} from './GR8_Carry';
import {GR8_Cropp} from './GR8_Cropp';
import {GR8_HAndM} from './GR8_HAndM';
import {GR8_Reserved} from './GR8_Reserved';
import {GR8_Zara} from './GR8_Zara';
import {IProduct, IProductFactory} from './Interfaces';

export class GR8 {
  public async getProducts(url: string | string[], category: ECategory): Promise<IProduct[]> {
    if (typeof url === 'string') {
      const brandInstance = this.getBrand(url);
      return await brandInstance.getProducts(url, category);
    } else if (typeof url === 'object') {
      let products: IProduct[] = [];
      for (const brand of url) {
        const brandInstance = this.getBrand(brand);
        products = products.concat(await brandInstance.getProducts(brand, category));
      }
      return products;
    }
  }

  private getBrand(url: string): IProductFactory {
    const hostname = new URL(url);
    console.log(hostname.hostname);
    switch (hostname.hostname) {
      case '4f.com.pl':
        return new GR8_4F();
      case 'www.cropp.com':
        return new GR8_Cropp();
      case 'www2.hm.com':
        return new GR8_HAndM();
      case 'www.reserved.com':
        return new GR8_Reserved();
      case 'www.c-and-a.com':
        return new GR8_CAndA();
      case 'www.zara.com':
        return new GR8_Zara();
      case 'carry.pl':
        return new GR8_Carry();
      default:
        console.error(`I can't find: ${hostname.hostname}`);
        break;
    }
  }
}
