import {test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel("Login / Logout Flow", () => {
    let loginPage: LoginPage
    let homePage: HomePage
  
    //Before Hook
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)

        await homePage.visit()
        //await page.goto('http://zero.webappsecurity.com/')
    })

    // Negative Scenario
    test('Negative Scenario for login', async ({page}) => {
        await homePage.clickSignIn()
        await loginPage.login('invalid username', 'invalid password')
        await loginPage.assertErrorMessage()
    })

    //Positive Scenario + Logout
    test('Positive Scenario for login + logout', async ({page}) => {
        await homePage.clickSignIn()
        await loginPage.login('username', 'password')
        await page.goBack()
        await page.click('text=More Services')
        await page.click('#account_summary_link')

        const accountsSummeryTab = await page.locator('#account_summary_tab')
        await expect(accountsSummeryTab).toBeVisible()
        await expect(accountsSummeryTab).toBeVisible()


        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})