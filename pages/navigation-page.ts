import BaseClass from "./base-class";
import {expect, Locator} from "@playwright/test";

export class NavigationPage extends BaseClass {

    async goto(path: string) {
        await this.page.goto(path);
    }

    async titleShouldBe(title: string) {
        let titleLocator: Locator = this.page.locator("//div[contains(@class, 'header-lined')]//h1");        
        await expect(titleLocator).toHaveText(title);
    }

}
