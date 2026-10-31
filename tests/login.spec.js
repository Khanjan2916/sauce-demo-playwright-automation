
const { test, expect } = require('@playwright/test');

// ==========================================
// SAUCE DEMO - LOGIN AUTOMATION TEST SUITE
// ==========================================

const URL = 'https://www.saucedemo.com/';

const USERS = {
    valid: {
        username: 'standard_user',
        password: 'secret_sauce'
    },

    locked: {
        username: 'locked_out_user',
        password: 'secret_sauce'
    },

    invalid: {
        username: 'wrong_user',
        password: 'wrong_password'
    }
};

// ==========================================
// TEST SUITE
// ==========================================

test.describe('Sauce Demo - Login Functionality', () => {

    // Open login page before every test
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });

    // TC01 - Verify login page UI
    test('TC01 - Verify login page elements', async ({ page }) => {

        await expect(page.locator('.login_logo'))
            .toHaveText('Swag Labs');

        await expect(page.locator('[data-test="username"]'))
            .toBeVisible();

        await expect(page.locator('[data-test="password"]'))
            .toBeVisible();

        await expect(page.locator('[data-test="login-button"]'))
            .toBeVisible();
    });

    // TC02 - Successful login
    test('TC02 - Login with valid credentials', async ({ page }) => {

        await page.locator('[data-test="username"]')
            .fill(USERS.valid.username);

        await page.locator('[data-test="password"]')
            .fill(USERS.valid.password);

        await page.locator('[data-test="login-button"]')
            .click();

        await expect(page).toHaveURL(/inventory.html/);

        await expect(page.locator('.title'))
            .toHaveText('Products');
    });

    // TC03 - Invalid username and password
    test('TC03 - Login with invalid credentials', async ({ page }) => {

        await page.locator('[data-test="username"]')
            .fill(USERS.invalid.username);

        await page.locator('[data-test="password"]')
            .fill(USERS.invalid.password);

        await page.locator('[data-test="login-button"]')
            .click();

        await expect(page.locator('[data-test="error"]'))
            .toContainText(
                'Username and password do not match'
            );

        await expect(page).toHaveURL(URL);
    });

    // TC04 - Empty username and password
    test('TC04 - Login with empty fields', async ({ page }) => {

        await page.locator('[data-test="login-button"]')
            .click();

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Username is required');
    });

    // TC05 - Empty password
    test('TC05 - Login with empty password', async ({ page }) => {

        await page.locator('[data-test="username"]')
            .fill(USERS.valid.username);

        await page.locator('[data-test="login-button"]')
            .click();

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Password is required');
    });

    // TC06 - Locked out user
    test('TC06 - Verify locked out user login', async ({ page }) => {

        await page.locator('[data-test="username"]')
            .fill(USERS.locked.username);

        await page.locator('[data-test="password"]')
            .fill(USERS.locked.password);

        await page.locator('[data-test="login-button"]')
            .click();

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Sorry, this user has been locked out');

        await expect(page).toHaveURL(URL);
    });

    // TC07 - Password field should be masked
    test('TC07 - Verify password field security', async ({ page }) => {

        await expect(page.locator('[data-test="password"]'))
            .toHaveAttribute('type', 'password');
    });

    // TC08 - Error message close button
    test('TC08 - Verify error message can be closed', async ({ page }) => {

        await page.locator('[data-test="login-button"]')
            .click();

        const errorMessage = page.locator('[data-test="error"]');
        const closeButton = page.locator('[data-test="error-button"]');

        await expect(errorMessage).toBeVisible();

        await closeButton.click();

        await expect(errorMessage).toBeHidden();
    });

});
