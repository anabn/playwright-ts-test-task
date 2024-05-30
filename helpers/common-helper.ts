import {chromium, Page} from '@playwright/test';
import {NavigationPage} from "../pages/navigation-page";

interface TestData {
    url: string;
    ip: string;
}

export const defaultData: TestData = {
    url: 'https://store.net/licenses',
    ip: '2.2.2.2'
};

export class CommonHelper {
    
    private async initializeBrowser() : Promise<Page> {
        const browser = await chromium.launch();
        let context = await browser.newContext();
        let page: Page = await context.newPage();
        return page;
    }

    async openBaseUrl() : Promise<Page> {
        let page = await this.initializeBrowser();   
        let navigationPage = new NavigationPage(page);
        await navigationPage.goto(defaultData.url);
        return page;
    }
}
