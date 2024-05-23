import BaseClass from "./base-class";

export class ConfigurePage extends BaseClass {

    async enterIPAddress(ip: string) {
        await this.page.locator("//label/text()[contains(., 'IP Address')]/../../input").fill(ip);
        await this.page.keyboard.press('Enter');

    }

    async ipValidatingIsNotDisplayed() {
        await this.page.locator("//i[contains(@class, 'fa-spin')]/following::text()[contains(., 'Validating')]").isHidden();
    }

    async addToCartAddon(addon: string) {
        await this.page.locator(`//label/text()[contains(., '${addon}')]/../../..//text()[contains(., 'Add to Cart')]/parent::div`).click();
    }

}
