import {URLSearchParams} from "url";
import {GR8_Abstract} from "./GR8_Abstract";
import {ECategory} from "./Enums";
import {IProduct} from "./Interfaces";
import {EBrand} from "./Enums";
import * as cheerio from "cheerio";

export class GR8_4F extends GR8_Abstract {
    public async getProducts(url: string, category: ECategory): Promise<IProduct[]> {
        // array for products
        const products: IProduct[] = [];
        // start page
        const body: CheerioElement = await this.getBody(url);
        // jQuery
        const $ = cheerio.load(body);

        // counting how many pages of products there are
        let pageNumber = parseInt($("section.pagination-box")
            .first()
            .children("span")
            .last()
            .text()
            .slice(1), 10);
        // if we can't check how many page are that means we have one page
        if (!pageNumber) { pageNumber = 1; }

        // if we have more than one page
        if (pageNumber > 1) {
            // get data from all of pages
            for (let page = 1; page <= pageNumber; page++) {
                // create a url to find all products of all pages
                const params = new URLSearchParams(url);
                params.set("5f3", page.toString());
                const pageUrl = params.toString();
                const pageBody = await this.getBody(pageUrl);
                // load next page
                const $ = cheerio.load(pageBody);
                const productsTable = $("div.product.box");
                const productsNumber = $(productsTable).length;
                // get product detail
                for (let index = 0; index < productsNumber; index++) {
                    const detailsBox = $(productsTable[index]).find("h4 a");
                    const title = $(detailsBox).attr("title");
                    const price = $(detailsBox).data("price");
                    const link = "https://4f.com.pl/" +  $(detailsBox).attr("href");
                    const imgSrc = "https://4f.com.pl/" + $(productsTable[index]).find("img").first().attr("src");
                    const id = this.set4fId(imgSrc);
                    // if not data, don't add to table
                    if (!title || !link || !id) { continue; }
                    // IProduct object
                    const product: IProduct = {
                        id,
                        title,
                        price,
                        link,
                        imgSrc,
                        brand_id: EBrand.FourF,
                        category_id: category,
                    };
                    products.push(product);
                }
            }
            return products;
        } else {
            // If we have only one page
            const productsTable = $("div.product_box");
            const productsNumber = $(productsTable).length;

            for (let index = 0; index < productsNumber; index++) {
                const detailsBox = $(productsTable[index]).find("h4 a");
                const title = $(detailsBox).attr("title");
                const price = $(detailsBox).data("price");
                const link = "https://4f.com.pl/" + $(detailsBox).attr("href");
                const imgSrc = "https://4f.com.pl/" + $(productsTable[index]).find("img").first().attr("src");
                const id = this.set4fId(imgSrc);

                if (!title || !link || !id) { continue; }

                const product: IProduct = {
                    id,
                    title,
                    price,
                    link,
                    imgSrc,
                    brand_id: EBrand.FourF,
                    category_id: category,
                };
                products.push(product);
            }
            return products;
        }
    }
    private set4fId(hiddenId: string): string {
        hiddenId = hiddenId.slice(hiddenId.indexOf("gfx/") + 4, hiddenId.indexOf(".jpg") - 5);
        return hiddenId;
    }
}
