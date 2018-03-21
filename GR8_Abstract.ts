import {IProductFactory} from "./Interfaces";
import {IProduct} from "./Interfaces";
import {ECategory} from "./Enums";

const request = require("request");

// abstract class to Factory
export abstract class GR8_Abstract implements IProductFactory {
    // request for Body
    public getBody(url: string): Promise<CheerioElement> {
        return new Promise<CheerioElement>((resolve, reject) => {
            request(url, (err, res, html) => {
                if (!err) {
                    resolve(html);
                } else {
                    reject(err);
                }
            });
        });
    }
    public abstract async getProducts(url: string, category: ECategory): Promise<IProduct[]>;
}
