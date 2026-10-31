
const { test, expect } = require('@playwright/test');

// ==========================================
// SAUCE DEMO - LOGOUT AUTOMATION TEST SUITE
// ==========================================

const URL = 'https://www.saucedemo.com/';

const USER = {
    username: 'standard_user',
    password: 'secret_sauce'
};

test.describe('Sauce Demo - Logout Functionality', () => {

    test.beforeEach(async ({ page }) => {

        // Open website
        await page.goto(URL);

        // Login
        await page.locator('[data-test="username"]')
            .fill(USER.username);

        await page.locator('[data-test="password"]')
            .fill(USER.password);

        await page.locator('[data-test="login-button"]')
            .click();

        // Verify successful login
        await expect(page).toHaveURL(/inventory.html/);
    });

    test('TC40 - Verify menu button visibility', async ({ page }) => {

        await expect(page.locator('#react-burger-menu-btn'))
            .toBeVisible();
    });

    test('TC41 - Verify logout option visibility', async ({ page }) => {

        await page.locator('#react-burger-menu-btn')
            .click();

        await expect(page.locator('#logout_sidebar_link'))
            .toBeVisible();
    });

    test('TC42 - Logout successfully', async ({ page }) => {

        // Open menu
        await page.locator('#react-burger-menu-btn')
            .click();

        // Click logout
        await page.locator('#logout_sidebar_link')
            .click();

        // Verify return to login page
        await expect(page).toHaveURL(URL);

        await expect(page.locator('.login_logo'))
            .toHaveText('Swag Labs');

        await expect(page.locator('[data-test="login-button"]'))
            .toBeVisible();
    });

    test('TC43 - Verify login fields after logout', async ({ page }) => {

        await page.locator('#react-burger-menu-btn')
            .click();

        await page.locator('#logout_sidebar_link')
            .click();

        await expect(page.locator('[data-test="username"]'))
            .toBeVisible();

        await expect(page.locator('[data-test="password"]'))
            .toBeVisible();
    });

    test('TC44 - Verify user cannot access inventory after logout', async ({ page }) => {

        await page.locator('#react-burger-menu-btn')
            .click();

        await page.locator('#logout_sidebar_link')
            .click();

        // Try to open inventory page directly
        await page.goto('https://www.saucedemo.com/inventory.html');

        // Verify user is redirected to login
        await expect(page).toHaveURL(URL);

        await expect(page.locator('[data-test="login-button"]'))
            .toBeVisible();
    });

});



