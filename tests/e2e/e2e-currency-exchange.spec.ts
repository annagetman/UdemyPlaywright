import {test, expect} from '@playwright/test';

test.describe("Currency Exchange Form", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://zero.webappsecurity.com/index.html');
        await page.click('#signin_button');
        await page.fill('#user_login', 'username');
        await page.fill('#user_password', 'password');
        await page.click('text=Sign in');
        await page.goBack();
        await page.click('#transfer_funds_link');
    });

    test("Should make exchange currency", async ({ page }) => {
await page.click('#pay_bills_tab');
await page.click('text=Purchase Foreign Currency');
await page.selectOption('#pc_currency', 'EUR'); // Select Euro

const rate = await page.locator('#sp_sell_rate');
await expect(rate).toBeVisible();
await expect(rate).toContainText('1 euro (EUR) = 1.3862 U.S. dollar (USD)'); // Example rate, adjust as needed  

await page.type('#pc_amount', '100'); 
await page.click('#pc_inDollars_true');  // Enter amount to exchange
await page.click('#pc_calculate_costs');

const conversionAmount = await page.locator('#pc_conversion_amount');
await expect(conversionAmount).toContainText('72.14 euro (EUR) = 100.00 U.S. dollar (USD)'); // Example conversion amount, adjust as needed
  
await page.click('#purchase_cash');

const message = await page.locator('#alert_content');
await expect(message).toBeVisible();
await expect(message).toContainText('Foreign currency cash was successfully purchased.'); // Verify success message
  });
})