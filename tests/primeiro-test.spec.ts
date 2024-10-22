import test from "@playwright/test";


test('Visitando página do Playwright', async ({ page }) => {
    await page.goto('http://playwright.dev');
    // await page.locator('.getStarted_Sjon').click();
    await page.getByText('Get started').click();
    const text = await page.getByText('Get started').textContent();
    console.log(text);
})