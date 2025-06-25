import {test, expect} from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe("Transfer Funds", () => {
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
    })

    test("Verify the results for each account", async ({ page }) => {
    await page.click('#account_activity_tab');
    await page.click('#aa_accountId');
    await page.selectOption('#aa_accountId', '2'); // Checking account
    const checkingAccount = await page.locator('#all_transactions_for_account tbody tr');
    await expect(checkingAccount).toHaveCount(3); // Assuming there are 5 transactions

    await page.selectOption('#aa_accountId', '4'); // Loan account
    const loanAccount = await page.locator('#all_transactions_for_account tbody tr');
    await expect(loanAccount).toHaveCount(2); // Assuming there are 2 transactions

    await page.selectOption('#aa_accountId', '6'); // Brokerage account
    const noResults = await page.locator('.well');
    await expect(noResults).toHaveText('No results.'); // Assuming no transactions in brokerage account
    });
})  