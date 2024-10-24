// https://the-internet.herokuapp.com/
import { expect, test } from "@playwright/test";
// https://www.saucedemo.com/v1/

// 1 - Success Login
// user - standard_user
// verify page URL
// verify at least 1 item at the final page (visible)
test('Success Login', async({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');

    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');

    await page.locator('input#login-button').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');

    const txtImgBackpack = page.locator('div.inventory_item_name').nth(0);
    await expect(txtImgBackpack).toBeVisible();
    await expect(txtImgBackpack).toHaveText('Sauce Labs Backpack');

    /*

    Udemy solution:
    
    await page.goto('https://www.saucedemo.com/v1/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('input#login-button').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
    
    const productsLabel = page.locator('div.product_label');
    await expect(productsLabel).toHaveText('Products');

    */
})

// 2 - Login with locked user
// user - locked_out_user
// verify error message
test('Login with locked user', async({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');

    await page.getByTestId('username').fill('locked_out_user');
    await page.getByTestId('password').fill('secret_sauce');

    await page.locator('input#login-button').click();

    const txtErrorMessage = page.getByTestId('error');

    await expect(txtErrorMessage).toBeVisible();
    await expect(txtErrorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');

    /*

    Udemy solution:
    
    const txtErrorMessage = page.getByTestId('error');

    await page.goto('https://www.saucedemo.com/v1/');

    await expect(errorLabel).not.toBeVisible();

    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('input#login-button').click();
   
    const errorLabel = page.locator('[data-test="error"]');
    await expect(errorLabel).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    await expect(errorLabel).toBeVisible();

    */
})

// 3 - Login error with wrong password
// verify error message
test('Login error with wrong password', async({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');

    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('wrongpassword');

    await page.locator('input#login-button').click();

    const txtErrorMessage = page.getByTestId('error');

    await expect(txtErrorMessage).toBeVisible();
    await expect(txtErrorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');

    /*

    Udemy solution:
    
    await page.goto('https://www.saucedemo.com/v1/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('asdf');
    await page.locator('input#login-button').click();
   
    const errorLabel = page.locator('[data-test="error"]');
    await expect(errorLabel).toHaveText('Epic sadface: Username and password do not match any user in this service');
    await expect(errorLabel).toBeVisible();

    */
})