
const { test, expect } = require('@playwright/test');

// ==========================================
// SAUCE DEMO - CHECKOUT AUTOMATION TEST SUITE
// ==========================================

const URL = 'https://www.saucedemo.com/';

const USER = {
    username: 'standard_user',
    password: 'secret_sauce'
};

const CUSTOMER = {
    firstName: 'Khanjan',
    lastName: 'Sonar',
    postalCode: '382010'
};

test.describe('Sauce Demo - Checkout Functionality', () => {

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

        // Add product to cart
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click();

        // Open cart
        await page.locator('.shopping_cart_link')
            .click();

        // Proceed to checkout
        await page.locator('[data-test="checkout"]')
            .click();

        await expect(page).toHaveURL(/checkout-step-one.html/);
    });

    test('TC33 - Verify checkout page elements', async ({ page }) => {

        await expect(page.locator('.title'))
            .toHaveText('Checkout: Your Information');

        await expect(page.locator('[data-test="firstName"]'))
            .toBeVisible();

        await expect(page.locator('[data-test="lastName"]'))
            .toBeVisible();

        await expect(page.locator('[data-test="postalCode"]'))
            .toBeVisible();

        await expect(page.locator('[data-test="continue"]'))
            .toBeVisible();

        await expect(page.locator('[data-test="cancel"]'))
            .toBeVisible();
    });

    test('TC34 - Verify checkout with empty fields', async ({ page }) => {

        await page.locator('[data-test="continue"]')
            .click();

        await expect(page.locator('[data-test="error"]'))
            .toContainText('First Name is required');

        await expect(page).toHaveURL(/checkout-step-one.html/);
    });

    test('TC35 - Verify checkout with missing last name', async ({ page }) => {

        await page.locator('[data-test="firstName"]')
            .fill(CUSTOMER.firstName);

        await page.locator('[data-test="continue"]')
            .click();

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Last Name is required');
    });

    test('TC36 - Verify checkout with missing postal code', async ({ page }) => {

        await page.locator('[data-test="firstName"]')
            .fill(CUSTOMER.firstName);

        await page.locator('[data-test="lastName"]')
            .fill(CUSTOMER.lastName);

        await page.locator('[data-test="continue"]')
            .click();

        await expect(page.locator('[data-test="error"]'))
            .toContainText('Postal Code is required');
    });

    test('TC37 - Checkout with valid customer information', async ({ page }) => {

        await page.locator('[data-test="firstName"]')
            .fill(CUSTOMER.firstName);

        await page.locator('[data-test="lastName"]')
            .fill(CUSTOMER.lastName);

        await page.locator('[data-test="postalCode"]')
            .fill(CUSTOMER.postalCode);

        await page.locator('[data-test="continue"]')
            .click();

        await expect(page).toHaveURL(/checkout-step-two.html/);

        await expect(page.locator('.title'))
            .toHaveText('Checkout: Overview');
    });

    test('TC38 - Verify cancel checkout functionality', async ({ page }) => {

        await page.locator('[data-test="cancel"]')
            .click();

        await expect(page).toHaveURL(/cart.html/);

        await expect(page.locator('.title'))
            .toHaveText('Your Cart');
    });

    test('TC39 - Verify checkout order total', async ({ page }) => {

        await page.locator('[data-test="firstName"]')
            .fill(CUSTOMER.firstName);

        await page.locator('[data-test="lastName"]')
            .fill(CUSTOMER.lastName);

        await page.locator('[data-test="postalCode"]')
            .fill(CUSTOMER.postalCode);

        await page.locator('[data-test="continue"]')
            .click();

        await expect(page.locator('.summary_subtotal_label'))
            .toHaveText('Item total: $29.99');

        await expect(page.locator('.summary_tax_label'))
            .toHaveText('Tax: $2.40');

        await expect(page.locator('.summary_total_label'))
            .toHaveText('Total: $32.39');
    });

});
