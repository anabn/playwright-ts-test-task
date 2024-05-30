import { Locator, expect } from "@playwright/test";
import BaseClass from "./base-class";

export class OrderSummaryPage extends BaseClass {

    private continueButton: Locator = this.page.locator("//*[contains(text(), 'Continue')]");
    private checkoutButton: Locator = this.page.locator("//div[contains(@class, 'express')]/following::*[contains(text(), 'Checkout')]");

    async totalDueTodaySumIs(total: string) {
        await expect(this.page.locator("//div[contains(@class, 'total-due-today')]/span[contains(@class, 'amt')]")).toHaveText(total);
    }

    async clickOnContinue() {
        await this.continueButton.click();
    }

    async continueButtonIsDisable() {
        await expect(this.continueButton).toBeDisabled();
    }

    async continueButtonIsEnabled() {
        await expect(this.continueButton).toBeEnabled();
    }

    async clickOnCheckout() {
        await this.checkoutButton.click();
    }

    async checkoutButtonIsDisable() {
        await expect(this.checkoutButton).toBeDisabled();
    }

    async checkoutButtonIsEnabled() {
        await expect(this.checkoutButton).toBeEnabled();
    }

}
