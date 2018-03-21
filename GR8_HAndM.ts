import {GR8_Abstract} from "./GR8_Abstract";
import {EBrand} from "./Enums";
import {IProduct} from "./Interfaces";
import {ECategory} from "./Enums";
import * as cheerio from "cheerio";

export class GR8_HAndM extends  GR8_Abstract {
    public async getProducts(url: string, category: ECategory): Promise<IProduct[]> {
        const products: IProduct[] = [];
        const $ = cheerio.load(await this.getBody(url));
        // create url to request page with all products
        const productsNumber = parseInt($(".total-count").text(), 10);
        url = url.slice(0, url.lastIndexOf("=") + 1) + productsNumber;

        const productTable = $("article.product-item");

        for (let index = 0; index <= productsNumber; index++) {
            const title = $(productTable[index]).find("h3.product-item-heading a").first().text();
            const priceString = $(productTable[index]).find("strong").first().text().replace(/\s/g, "");
            const price = parseFloat(priceString.replace(",", "."));
            const imgSrc = $(productTable[index]).find("img.product-item-image").first().attr("src");
            const link = $(productTable[index]).find("a.product-item-link").first().attr("href");
            if (!link) { continue; }
            const id = "HM-" + link.slice(link.indexOf("page.") + 5, link.indexOf(".html"));

            if (!title || !link || !id) { continue; }

            const product: IProduct = {
                id,
                title,
                price,
                imgSrc,
                link,
                brand_id: EBrand.HAndM,
                category_id: category,
            };

            products.push(product);
        }
        return products;
    }
}

