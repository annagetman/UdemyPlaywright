import {test, expect} from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe("Transfer Funds and Make Peyments", () => {
  let homePage: HomePage
  let loginPage: LoginPage  

test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page) 

        homePage.visit()
        homePage.clickSignIn()
        // await page.goto('http://zero.webappsecurity.com/login.html');
        loginPage.login('username', 'password')
    // await page.goto('http://zero.webappsecurity.com/index.html');
    // await page.click('#signin_button');
    // await page.fill('#user_login', 'username');
    // await page.fill('#user_password', 'password');
    // await page.click('text=Sign in');
    // await page.goBack();
    // await page.click('#transfer_funds_link');
});

test("Transfer Funds", async ({ page }) => {
    await page.waitForSelector('#transfer_funds_tab');
    await page.click('#transfer_funds_tab');
    await page.selectOption('#tf_fromAccountId', '2'); // Checking account
    await page.selectOption('#tf_toAccountId', '3'); // Savings account
    await page.fill('#tf_amount', '100');
    await page.fill('#tf_description', 'Test transfer');
    await page.click('#btn_submit');

    const boardHeader = await page.locator('h2.board-header');
    await expect(boardHeader).toHaveText('Transfer Money & Make Payments - Verify');
    await page.click('#btn_submit');
    const successMessage = await page.locator('.alert-success');
    await expect(successMessage).toHaveText('You successfully submitted your transaction.');
    });
});
