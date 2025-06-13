import {test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { log } from 'console'

test.describe.parallel("Login / Logout Flow", () => {
    let loginPage: LoginPage
    //Before Hook

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)

        await loginPage.visit()
        //await page.goto('http://zero.webappsecurity.com/')
    })

    // Negative Scenario
    test('Negative Scenario for login', async ({page}) => {
        await page.click('#signin_button')
        // await page.type("#user_login", "invalid username")
        // await page.type("#user_password", "invalid password")
        // await page.click('text=Sign in')
        await loginPage.login('invalid username', 'invalid password')
        await loginPage.assertErrorMessage()
        // const errorMessage = await page.locator('.alert-error')
        // await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })

    //Positive Scenario + Logout
    test('Positive Scenario for login + logout', async ({page}) => {
        await page.click('#signin_button')
        // await page.type("#user_login", "username")
        // await page.type("#user_password", "password")
        // await page.click('text=Sign in')
        await page.goBack()
        await page.click('text=More Services')
        await page.click('#account_summary_link')
        await loginPage.login('username', 'password')

        // const accountsSummeryTab = await page.locator('#account_summary_tab')
        // await expect(accountsSummeryTab).toBeVisible()
                // await expect(accountsSummeryTab).toBeVisible()


        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})