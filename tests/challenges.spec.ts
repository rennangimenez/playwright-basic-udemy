// https://the-internet.herokuapp.com/
import { expect, test } from "@playwright/test";
// https://www.saucedemo.com/v1/

// 1 - Success Login
// user - standard_user
// verify page URL
// verify at least 1 iten at the final page (visible)
test('challenge 1', async({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');
    await expect(page).toHaveURL('https://www.saucedemo.com/v1/');

    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');

    const btnLogin = page.locator('input#login-button');
    btnLogin.click();

    const txtImgBackpack = page.locator('div.inventory_item_name').nth(0);

    await expect(txtImgBackpack).toBeVisible();
    await expect(txtImgBackpack).toHaveText('Sauce Labs Backpack');
})

// 2 - Login with locked user
// user - locked_out_user
// verify error message
test('challenge 2', async({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');

    await page.getByTestId('username').fill('locked_out_user');
    await page.getByTestId('password').fill('secret_sauce');

    const btnLogin = page.locator('input#login-button');
    btnLogin.click();

    const txtErrorMessage = page.getByTestId('error');

    await expect(txtErrorMessage).toBeVisible();
    await expect(txtErrorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
})

// 3 - Login error - wrong password
// verify error message
test('challenge 3', async({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');

    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('wrongpassword');

    const btnLogin = page.locator('input#login-button');
    btnLogin.click();

    const txtErrorMessage = page.getByTestId('error');

    await expect(txtErrorMessage).toBeVisible();
    await expect(txtErrorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
})