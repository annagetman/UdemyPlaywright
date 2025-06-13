import {test, expect} from '@playwright/test';

test.describe("Transfer Funds", () => {
test.beforeEach(async ({page}) => {
    await page.goto('http://zero.webappsecurity.com/index.html');
    await page.click('#signin_button');
    await page.fill('#user_login', 'username');
    await page.fill('#user_password', 'password');
    await page.click('text=Sign in');
    await page.goBack();
}) 

test("Should send new payment", async ({ page }) => {
    await page.click('#transfer_funds_link');
await page.click('#pay_bills_tab');
await page.selectOption('#sp_payee', 'Apple');
await page.click('#sp_get_payee_details');
await page.waitForSelector('#sp_payee_details');
const payeeDetails = await page.locator('#sp_payee_details');
await expect(payeeDetails).toContainText('For 48944145651315 Apple account');
await page.selectOption('#sp_account', '6'); // savings 
await page.fill('#sp_amount', '100');
await page.fill('#sp_date', '2023-10-01');
await page.fill('#sp_description', 'Payment for Apple products');
await page.click('#pay_saved_payees');

const successMessage = await page.locator('#alert_content > span');
await expect(successMessage).toBeVisible();
await expect(successMessage).toContainText('The payment was successfully submitted.');
})

})