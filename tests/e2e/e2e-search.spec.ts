import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

test.describe("Search Result", () => {
    test('Should find search result', async ({page}) => {
        let homePage: HomePage = new HomePage(page)
        await homePage.visit()
        await homePage.searchFor('bank')

    const numberOfLinks = await page.locator('li > a')
    await expect(numberOfLinks).toHaveCount(2)
 
    })
})