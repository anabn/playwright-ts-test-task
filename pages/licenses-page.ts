import BaseClass from "./base-class";

export class LicensesPage extends BaseClass {

    async orderProduct(product: string) {
        await this.page.locator(`//span[contains(text(), '${product}')]/following::a[contains(@id, 'order')]`).click();
    }

}
