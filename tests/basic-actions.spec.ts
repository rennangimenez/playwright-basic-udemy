// https://the-internet.herokuapp.com/

/*  Add this to the file settings.json (control + shift + P --> open user settings JSON)

"editor.codeActionsOnSave":{
        "source.fixAll": "explicit" 
    },

*/

import { expect, test } from "@playwright/test";

test('Basic actions 001', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/forgot_password');
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

test('Basic actions 002', async ({ page }) => {
    // dropdwons
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    const dropdown = page.locator('select#dropdown');

    await dropdown.selectOption('1');
    await expect(dropdown).toHaveValue('1');
    
    await dropdown.selectOption({label: 'Option 2'});
    await expect(dropdown).toHaveValue('2');

    // hover
    await page.goto('https://the-internet.herokuapp.com/hovers');
    const img1 = page.locator('div.figure').nth(0);
    const img2 = page.locator('div.figure').nth(1);
    const img3 = page.locator('div.figure').nth(2);

    const imgInfo1 = img1.locator('.figcaption');
    const imgInfo2 = img2.locator('.figcaption');
    const imgInfo3 = img3.locator('.figcaption');

    //await page.pause(); // test will stop here - good for debugging --> RUN: npx playwright test --debug
    await img1.hover();
    await expect(imgInfo1).toBeVisible();
    await expect(imgInfo2).toBeHidden();
    await expect(imgInfo3).toBeHidden();

    await img2.hover();
    await expect(imgInfo1).toBeHidden();
    await expect(imgInfo2).toBeVisible();
    await expect(imgInfo3).toBeHidden();

    await img3.hover();
    await expect(imgInfo1).toBeHidden();
    await expect(imgInfo2).toBeHidden();
    await expect(imgInfo3).toBeVisible();

    await imgInfo3.getByRole('link').click();
    // await imgInfo3.locator('a').click();

    await expect(page).toHaveURL('https://the-internet.herokuapp.com/users/3');
})