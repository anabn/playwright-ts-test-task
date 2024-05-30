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
        const productInfo = await this.getProductInfo(this.productType);
        await expect(productInfo).toBeVisible();
    }

    async ipAddressIs(ip: string) {     
        const productInfo = await this.getProductInfo(this.productType);
        const ipElement = productInfo.locator("//following-sibling::td[2]");
        await expect(ipElement).toHaveText(ip);
    }

    async recurringPriceIs(price: string) {
        const productInfo = await this.getProductInfo(this.productType);
        const recurringPriceElement = productInfo.locator("//following-sibling::td[3]");
        await expect(recurringPriceElement).toHaveText(price);
    }

    async monthlyPriceIs(price: string) {     
        const productInfo = await this.getProductInfo(this.productType);
        const priceElement = productInfo.locator("//following-sibling::td[4]");
        await expect(priceElement).toHaveText(price);
    }

}
