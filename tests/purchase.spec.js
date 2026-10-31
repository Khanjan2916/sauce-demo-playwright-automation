
const { test, expect } = require('@playwright/test');

// ==========================================
// SAUCE DEMO - PURCHASE AUTOMATION TEST SUITE
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

test.describe('Sauce Demo - Purchase Functionality', () => {

    test.beforeEach(async ({ page }) => {
        // Open Sauce Demo website
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

    test('TC28 - Add product and proceed to checkout', async ({ page }) => {

        // Add backpack to cart
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click();

        // Open shopping cart
        await page.locator('.shopping_cart_link')
            .click();

        // Click checkout
        await page.locator('[data-test="checkout"]')
            .click();

        // Verify checkout information page
        await expect(page).toHaveURL(/checkout-step-one.html/);

        await expect(page.locator('.title'))
            .toHaveText('Checkout: Your Information');
    });

    test('TC29 - Enter customer checkout information', async ({ page }) => {

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click();

        await page.locator('.shopping_cart_link')
            .click();

        await page.locator('[data-test="checkout"]')
            .click();

        // Fill customer details
        await page.locator('[data-test="firstName"]')
            .fill(CUSTOMER.firstName);

        await page.locator('[data-test="lastName"]')
            .fill(CUSTOMER.lastName);

        await page.locator('[data-test="postalCode"]')
            .fill(CUSTOMER.postalCode);

        // Continue to order overview
        await page.locator('[data-test="continue"]')
            .click();

        await expect(page).toHaveURL(/checkout-step-two.html/);

        await expect(page.locator('.title'))
            .toHaveText('Checkout: Overview');
    });

    test('TC30 - Verify checkout order summary', async ({ page }) => {

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click();

        await page.locator('.shopping_cart_link')
            .click();

        await page.locator('[data-test="checkout"]')
            .click();

        await page.locator('[data-test="firstName"]')
            .fill(CUSTOMER.firstName);

        await page.locator('[data-test="lastName"]')
            .fill(CUSTOMER.lastName);

        await page.locator('[data-test="postalCode"]')
            .fill(CUSTOMER.postalCode);

        await page.locator('[data-test="continue"]')
            .click();

        // Verify product and price
        await expect(page.locator('.inventory_item_name'))
            .toHaveText('Sauce Labs Backpack');

        await expect(page.locator('.inventory_item_price'))
            .toHaveText('$29.99');

        // Verify total
        await expect(page.locator('.summary_total_label'))
            .toHaveText('Total: $32.39');
    });

    test('TC31 - Complete purchase successfully', async ({ page }) => {

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click();

        await page.locator('.shopping_cart_link')
            .click();

        await page.locator('[data-test="checkout"]')
            .click();

        await page.locator('[data-test="firstName"]')
            .fill(CUSTOMER.firstName);

        await page.locator('[data-test="lastName"]')
            .fill(CUSTOMER.lastName);

        await page.locator('[data-test="postalCode"]')
            .fill(CUSTOMER.postalCode);

        await page.locator('[data-test="continue"]')
            .click();

        // Finish purchase
        await page.locator('[data-test="finish"]')
            .click();

        // Verify order confirmation
        await expect(page).toHaveURL(/checkout-complete.html/);

        await expect(page.locator('.complete-header'))
            .toHaveText('Thank you for your order!');
    });

    test('TC32 - Verify back home after purchase', async ({ page }) => {

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click();

        await page.locator('.shopping_cart_link')
            .click();

        await page.locator('[data-test="checkout"]')
            .click();

        await page.locator('[data-test="firstName"]')
            .fill(CUSTOMER.firstName);

        await page.locator('[data-test="lastName"]')
            .fill(CUSTOMER.lastName);

        await page.locator('[data-test="postalCode"]')
            .fill(CUSTOMER.postalCode);

        await page.locator('[data-test="continue"]')
            .click();

        await page.locator('[data-test="finish"]')
            .click();

        await page.locator('[data-test="back-to-products"]')
            .click();

        await expect(page).toHaveURL(/inventory.html/);

        await expect(page.locator('.title'))
            .toHaveText('Products');
    });

});
