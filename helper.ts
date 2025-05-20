export async function loadHomePage(page) {
    await page.goto('https://example.com/')
}

export async function asserTitle(page) {
    await page.waitForSelector('h1')
}