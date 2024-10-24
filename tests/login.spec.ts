import { expect, test } from "@playwright/test";

/**
 * Test Hooks
 * test.beforeEach
 * test.beforeAll - executed 1x by worker
 * test.afterEach
 * test.afterAll - executed 1x by worker
*/

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');
})

/** 
 * Test Suite
 * Group 01 - Success login
 * Group 02 - Fail to login 
*/

test.describe('Login with success', async () => {
    test.beforeAll(async () => {
        console.log('Starting successfull login test suit');
    })

    test('Correct user and passwd - standard user', async({ page }) => {
        //await page.goto('https://www.saucedemo.com/v1/');
    
        await page.getByTestId('username').fill('standard_user');
        await page.getByTestId('password').fill('secret_sauce');
    
        await page.locator('input#login-button').click();
    
        await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
    
        const txtImgBackpack = page.locator('div.inventory_item_name').nth(0);
        await expect(txtImgBackpack).toBeVisible();
        await expect(txtImgBackpack).toHaveText('Sauce Labs Backpack');
    })

    test.afterAll(async () => {
        console.log('Finishing successfull login test suit');
    })
})

test.describe('Fail to login', async () => {
    test.beforeAll(async () => {
        console.log('Starting fail login test suit');
    })

    test('Login with locked user', async({ page }) => {
        //await page.goto('https://www.saucedemo.com/v1/');
    
        await page.getByTestId('username').fill('locked_out_user');
        await page.getByTestId('password').fill('secret_sauce');
    
        await page.locator('input#login-button').click();
    
        const txtErrorMessage = page.getByTestId('error');
    
        await expect(txtErrorMessage).toBeVisible();
        await expect(txtErrorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    })

    test('Login error with wrong password', async({ page }) => {
        //await page.goto('https://www.saucedemo.com/v1/');
    
        await page.getByTestId('username').fill('standard_user');
        await page.getByTestId('password').fill('wrongpassword');
    
        await page.locator('input#login-button').click();
    
        const txtErrorMessage = page.getByTestId('error');
    
        await expect(txtErrorMessage).toBeVisible();
        await expect(txtErrorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })

    test.afterEach(async () => {
        console.log('Finishing each fail login tests');
    })

    test.afterAll(async () => {
        console.log('Finishing fail login test suit');
    })
})