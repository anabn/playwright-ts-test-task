import { Page } from "@playwright/test";

export default class BaseClass {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}
