import { expect, test } from "@playwright/test";

test('Controlling a new tab on browser', async ({ page }) => {
    // navigate to first URL
    await page.goto('https://playwright.dev/');

    // define an event (promise) that will wait for the event of open a new tab in browser
    const pagePromise = page.context().waitForEvent('page');
    await page.locator('.gh-btn').getByText('Star').click();

    // "capturing" the new tab opened so we can control it
    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    console.log(await newPage.title());
    await expect(newPage).toHaveURL('https://github.com/microsoft/playwright');

    // brings the first opened page to the front so we can see it again and check if it navigates to GOOGLE
    await page.bringToFront();
    await page.goto('https://www.google.com');
    await expect(newPage).toHaveURL('https://www.google.com');
})