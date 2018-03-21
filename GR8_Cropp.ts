import {GR8_Abstract} from "./GR8_Abstract";
import {EBrand} from "./Enums";
import {IProduct} from "./Interfaces";
import * as cheerio from "cheerio";

export class GR8_Cropp extends GR8_Abstract {
    public async getProducts(url: string, category): Promise<IProduct[]> {
        const products: IProduct[] = [];

        const body = await this.getBody(url);
        const $ = cheerio.load(body);

        const productsTable = $("div#products");
        let scriptData = $(productsTable).next().html();
        const start = scriptData.indexOf("return");
        const end = scriptData.indexOf("}};");

        scriptData = scriptData.substr(start, end).replace("return", "").trim();
        scriptData = scriptData.substr(0, scriptData.indexOf("}};") + 2);
        const croppData = JSON.parse([scriptData]);

        for (let index in croppData) {
            let product = {
                id: "CR-" + croppData[index].id,
                title: croppData[index].name,
                link: croppData[index].url,
                price: croppData[index].original_price,
                imgSrc: croppData[index].image_front,
                brand_id: EBrand.Cropp,
                category_id: category,
            };
            products.push(product);
        }
        return products;
    }
}

