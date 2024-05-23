import { expect } from "@playwright/test";
import BaseClass from "./base-class";

export class CheckoutOrderPage extends BaseClass { 

    async totalDueTodaySumIs(total: string) {
        await expect(this.page.locator("//div[contains(@id, 'totalCartPrice')]")).toHaveText(total);
    }

    async sectionIsVisible(section: string) {
        await expect(this.page.locator(`//div[contains(@class, 'sub-heading')]/span[contains(text(), '${section}')]`)).toBeVisible();
    }

    async completeOrderButtonIsDisable() {
        await expect(this.page.locator("//button[contains(@id, 'btnCompleteOrder')]")).toBeDisabled();
    }
}