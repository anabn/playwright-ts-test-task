import { expect } from "@playwright/test";
import BaseClass from "./base-class";

export class ReviewCheckoutPage extends BaseClass { 

    async followingItemShouldPresent(item: string) {
        await expect(this.page.locator(`//*[contains(text(), '${item}')]`)).toBeVisible();
    }

}
