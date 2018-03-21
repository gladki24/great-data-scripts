import {GR8_Abstract} from "./GR8_Abstract";
import {EBrand} from "./Enums";
import {IProduct} from "./Interfaces";
import {ECategory} from "./Enums";
import * as cheerio from "cheerio";

export class GR8_Reserved extends GR8_Abstract {
    public async getImageSource(url: string): Promise<string> {
        const $ = cheerio.load(await this.getBody(url));
        let imgSrc = $("div.zoomImage").first().css("background-image");
        imgSrc = imgSrc.substr(imgSrc.indexOf("url('") + 5);
        imgSrc = imgSrc.substr(0, imgSrc.indexOf("')"));

        return imgSrc;
    }

    public async getProducts(url: string, category: ECategory): Promise<IProduct[]> {
        const products: IProduct[] = [];
        const $ = cheerio.load(await this.getBody(url));

        const productsTable = $("div.item");
        const productsNumber = $(productsTable).length;

        for (let index = 0; index < productsNumber; index++) {
            const title = $(productsTable[index]).find("div.basic-info a").first().text();
            const link = $(productsTable[index]).find("a").first().attr("href");
            const priceString = $(productsTable[index]).find("p.price").first().text();
            const price = parseFloat(priceString.replace(",", "."));
            if (!title || !link) { continue; }

            const imgSrc = await this.getImageSource(link);
            const id = "RE-" + imgSrc.slice(imgSrc.lastIndexOf("/") + 1, imgSrc.indexOf("-001"));

            if (!id) { continue; }

            const product: IProduct = {
                id,
                title,
                price,
                imgSrc,
                link,
                brand_id: EBrand.Reserved,
                category_id: category,
            };
            products.push(product);
        }
        return products;
    }
}

