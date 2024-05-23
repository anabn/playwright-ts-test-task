import { Locator, Page, expect } from "@playwright/test";
import BaseClass from "./base-class";

export class ProductOrderInfo extends BaseClass {
    
    private productType: string; 

    constructor(product: string, page: Page) {
        super(page);
        this.productType = product;
    }

    private async getProductInfo(product: string) {
        return this.page.locator(`//td[contains(text(), '${product}')]`);
    }

    async productIsAdded() {     
        expect(await this.getProductInfo(this.productType)).toBeVisible;
    }

    async ipAddressIs(ip: string) {     
        expect((await this.getProductInfo(this.productType)).locator("//following-sibling::td[2]")).toHaveText(ip);
    }

    async recurringPriceIs(price: string) {     
        expect((await this.getProductInfo(this.productType)).locator("//following-sibling::td[3]")).toHaveText(price);
    }

    async monthlyPriceIs(price: string) {     
        expect((await this.getProductInfo(this.productType)).locator("//following-sibling::td[4]")).toContainText(price);
    }

}
