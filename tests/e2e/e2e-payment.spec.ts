import {test, expect} from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage'
import { PaymentPage } from '../../page-objects/PaymentPage';
import { Navbar } from '../../page-objects/components/Navbar';

test.describe("Transfer Funds", () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let paymentPage: PaymentPage
  let navbar: Navbar  

test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page) 
        paymentPage = new PaymentPage(page)
        navbar = new Navbar(page)

        homePage.visit()
        homePage.clickSignIn()
        loginPage.login('username', 'password')

}) 

test("Should send new payment", async ({ page }) => {
  navbar.clickOnTab('Pay Bills');
await paymentPage.createPayment('Apple', '6', '100', '2023-10-01', 'Payment for Apple products');
await paymentPage.assertPaymentSuccess();

// const successMessage = await page.locator('#alert_content > span');
// await expect(successMessage).toBeVisible();
// await expect(successMessage).toContainText('The payment was successfully submitted.');
})

})