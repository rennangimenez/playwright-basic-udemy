import { expect, test } from "@playwright/test";

test('Locating by data-test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByTestId('username').fill('rennan');
})

test('Basic assertions', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');
    const loginBtn = page.locator('input#login-button'); //input[id="login-button"]
    await expect.soft(loginBtn).toHaveCSS('background-color','rgb(225, 35, 26)'); //when using expct.soft the test will not stop if the validation FAIL
    await expect(loginBtn).not.toHaveCSS('background-color','rgb(0, 0, 0)');
    await expect(loginBtn).toHaveAttribute('value','LOGIN');
    await expect.soft(loginBtn, 'Button is visible').toBeHidden(); //using a string message to log the error and make the debug more easy to understand
    await expect(loginBtn).toBeVisible();
})
