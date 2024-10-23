// https://the-internet.herokuapp.com/
import { expect, test } from "@playwright/test";

test('Basic actions 001', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/forgot_password'); // navigate to a page - parameter
    const inputEmail = page.locator('input#email');
    await inputEmail.fill('contato.rennang@gmailcom');
    await inputEmail.fill('');
    await inputEmail.pressSequentially('123456');
    await expect(inputEmail).toHaveValue('123456');

    // page.click()
    await page.goto('https://the-internet.herokuapp.com/');
    const linkCheckboxes = page.locator('a[href="/checkboxes"]');
    await linkCheckboxes.click();

    // checkboxes
    const checkbox1 = page.locator('input[type="checkbox"]').nth(0);
    await checkbox1.check();
    const checkbox2 = page.locator('input[type="checkbox"]').nth(1);
    await checkbox2.uncheck();

    await expect(checkbox2).not.toBeChecked();
    await expect(checkbox1).toBeChecked();
})