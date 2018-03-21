import {GR8_Abstract} from "./GR8_Abstract";
import {EBrand} from "./Enums";
import {IProduct} from "./Interfaces";
import {ECategory} from "./Enums";
import * as cheerio from "cheerio";

export class GR8_Zara extends  GR8_Abstract {
    public async getImageSource(url: string): Promise<string> {
        const $ = cheerio.load(await this.getBody(url));
        return $("a._seoImg").first().attr("href");
    }

    public async getProducts(url: string, category: ECategory): Promise<IProduct[]> {
        const products: IProduct[] = [];

        const $ = cheerio.load(await this.getBody(url));

        const productsTable = $("li.product");
        const productsNumber = $(productsTable).length;

        for (let index = 1; index < productsNumber; index++) {
            const link = $(productsTable[index]).children("a.item").first().attr("href");
            if (!link) continue;
            const title = $(productsTable[index]).find("a.name").first().text();
            const id = "ZA-" + link.slice(link.indexOf("v1=") + 3, link.indexOf("&v2"));
            const price = parseFloat($(productsTable[index]).find("div.price").children("span").data("price"));

            if (!title || !id || !link) { continue; }

            const imgSrc = await this.getImageSource(link);

            const product = {
                id,
                title,
                link,
                price,
                imgSrc,
                brand_id: EBrand.Zara,
                category_id: category,
            };

            products.push(product);
        }
        return products;
    }
}
