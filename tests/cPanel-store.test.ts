import { Page, test } from '@playwright/test';
import { CommonHelper, defaultData } from "../helpers/common-helper";
import { NavigationPage } from '../pages/navigation-page';
import { CPanelLicensesPage } from '../pages/cPanel-licenses-page';
import { ConfigurePage } from '../pages/configure-page';
import { OrderSummaryPage } from '../pages/order-summary-page';
import { ReviewCheckoutPage } from '../pages/review-checkout-class';
import { CheckoutOrderPage } from '../pages/checkout-order-page';
import { ProductOrderInfo } from '../pages/product-order-info-page';

let page: Page;
let navigationPage: NavigationPage;
let cPanelLicensesPage: CPanelLicensesPage;
let configurePage: ConfigurePage;
let orderSummaryPage: OrderSummaryPage;
let reviewCheckoutPage: ReviewCheckoutPage;
let checkoutOrderPage: CheckoutOrderPage;

test.beforeEach(async () => {
    page = await new CommonHelper().openBaseUrl();
    navigationPage = new NavigationPage(page);
    cPanelLicensesPage = new CPanelLicensesPage(page);
    configurePage = new ConfigurePage(page);
    orderSummaryPage = new OrderSummaryPage(page);
    reviewCheckoutPage = new ReviewCheckoutPage(page);
    checkoutOrderPage = new CheckoutOrderPage(page);
});

test("User is able to order product with addons using cPanel Store", async () => {
    const product = 'cPanel Pro Cloud (30 Accounts)';
    const addon = 'Monthly CloudLinux for cPanel License';
    const productValue = '$12.48 USD';
    const addonValue = '$4.65 USD';
    const totalValue = '$17.13 USD';
    const productInfo: ProductOrderInfo = new ProductOrderInfo(product, page);
    const addonInfo: ProductOrderInfo = new ProductOrderInfo(addon, page)
    
    await navigationPage.titleShouldBe('cPanel Licenses');
    await cPanelLicensesPage.orderProduct(product);

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

    ['Personal Information', 'Billing Address', 'Account Security', 'Terms & Conditions', 'Payment Details'].forEach((section: string) => {
        checkoutOrderPage.sectionIsVisible(section);
    });
    await checkoutOrderPage.completeOrderButtonIsDisable();
});