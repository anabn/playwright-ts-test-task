import { test } from '@playwright/test';
import { defaultData } from "../helpers/common-helper";
import { NavigationPage } from '../pages/navigation-page';
import { LicensesPage } from '../pages/licenses-page';
import { ConfigurePage } from '../pages/configure-page';
import { OrderSummaryPage } from '../pages/order-summary-page';
import { ReviewCheckoutPage } from '../pages/review-checkout-class';
import { CheckoutOrderPage } from '../pages/checkout-order-page';
import { ProductOrderInfo } from '../pages/product-order-info-page';

test.describe('Example Test Suite', () => {
    let page: any; 
    let navigationPage: NavigationPage;
    let licensesPage: LicensesPage;
    let configurePage: ConfigurePage;
    let orderSummaryPage: OrderSummaryPage;
    let reviewCheckoutPage: ReviewCheckoutPage;
    let checkoutOrderPage: CheckoutOrderPage;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        navigationPage = new NavigationPage(page);
        licensesPage = new LicensesPage(page);
        configurePage = new ConfigurePage(page);
        orderSummaryPage = new OrderSummaryPage(page);
        reviewCheckoutPage = new ReviewCheckoutPage(page);
        checkoutOrderPage = new CheckoutOrderPage(page);

        await navigationPage.goto(defaultData.url);
    });

    test("User is able to order product with addons using web panel", async () => {
        const product = 'product';
        const addon = 'addon';
        const productValue = '$xx USD';
        const addonValue = '$xx USD';
        const totalValue = '$xx USD';
        const productInfo: ProductOrderInfo = new ProductOrderInfo(product, page);
        const addonInfo: ProductOrderInfo = new ProductOrderInfo(addon, page)
        
        await navigationPage.titleShouldBe('panel');
        await licensesPage.orderProduct(product);

        await navigationPage.titleShouldBe('Configure');
        await orderSummaryPage.continueButtonIsDisable();
        await orderSummaryPage.totalDueTodaySumIs(productValue);
        await configurePage.enterIPAddress(defaultData.ip);
        await configurePage.addToCartAddon(addon);
    
        await configurePage.ipValidatingIsNotDisplayed();
        await orderSummaryPage.continueButtonIsEnabled();
        await orderSummaryPage.totalDueTodaySumIs(totalValue);
        await orderSummaryPage.clickOnContinue();

        await navigationPage.titleShouldBe('Review & Checkout');
        await reviewCheckoutPage.followingItemShouldPresent(product);
        await reviewCheckoutPage.followingItemShouldPresent(addon);
        await orderSummaryPage.totalDueTodaySumIs(totalValue);
        await orderSummaryPage.checkoutButtonIsEnabled();

        await orderSummaryPage.clickOnCheckout();

        await navigationPage.titleShouldBe('Checkout');

        await productInfo.productIsAdded();
        await productInfo.ipAddressIs(defaultData.ip);
        await productInfo.monthlyPriceIs(productValue);

        await addonInfo.productIsAdded();
        await addonInfo.ipAddressIs(defaultData.ip);
        await addonInfo.monthlyPriceIs(addonValue);

        await checkoutOrderPage.totalDueTodaySumIs(totalValue);

        for (const section of ['info', 'Terms & Conditions']) {
            await checkoutOrderPage.sectionIsVisible(section);
        }
        
        await checkoutOrderPage.completeOrderButtonIsDisable();

    });

    test.afterEach(async () => {
        await page.close();
      });

});
