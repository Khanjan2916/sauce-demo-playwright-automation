
const { test, expect } = require('@playwright/test');

// ==========================================
// SAUCE DEMO - SHOPPING CART AUTOMATION SUITE
// ==========================================

const URL = 'https://www.saucedemo.com/';

const USER = {
    username: 'standard_user',
    password: 'secret_sauce'
};

const PRODUCTS = {
    backpack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light',
    boltShirt: 'Sauce Labs Bolt T-Shirt'
};

// ==========================================
// TEST SUITE
// ==========================================

test.describe('Sauce Demo - Shopping Cart Functionality', () => {

    // Login before every test
    test.beforeEach(async ({ page }) => {

        await page.goto(URL);

        await page.locator('[data-test="username"]')
            .fill(USER.username);

        await page.locator('[data-test="password"]')
            .fill(USER.password);

        await page.locator('[data-test="login-button"]')
            .click();

        await expect(page).toHaveURL(/inventory.html/);
    });

    // TC19 - Verify cart icon
    test('TC19 - Verify shopping cart icon visibility', async ({ page }) => {

        await expect(page.locator('.shopping_cart_link'))
            .toBeVisible();
    });

    // TC20 - Add one product to cart
    test('TC20 - Add one product to shopping cart', async ({ page }) => {

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click();

        await expect(page.locator('.shopping_cart_badge'))
            .toHaveText('1');
    });

    // TC21 - Add multiple products to cart
    test('TC21 - Add multiple products to shopping cart', async ({ page }) => {

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click();

        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
            .click();

        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
            .click();

        await expect(page.locator('.shopping_cart_badge'))
            .toHaveText('3');
    });

    // TC22 - Verify cart badge count
    test('TC22 - Verify cart badge count', async ({ page }) => {

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click();

        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
            .click();

        await expect(page.locator('.shopping_cart_badge'))
            .toHaveText('2');
    });

    // TC23 - Open shopping cart
    test('TC23 - Verify shopping cart page', async ({ page }) => {

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click();

        await page.locator('.shopping_cart_link')
            .click();

        await expect(page).toHaveURL(/cart.html/);

        await expect(page.locator('.title'))
            .toHaveText('Your Cart');
    });

    // TC24 - Verify product details in cart
    test('TC24 - Verify product details in shopping cart', async ({ page }) => {

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click();

        await page.locator('.shopping_cart_link')
            .click();

        await expect(page.locator('.inventory_item_name'))
            .toHaveText(PRODUCTS.backpack);

        await expect(page.locator('.inventory_item_price'))
            .toHaveText('$29.99');

        await expect(page.locator('.cart_quantity'))
            .toHaveText('1');
    });

    // TC25 - Remove product from cart
    test('TC25 - Remove product from shopping cart', async ({ page }) => {

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click();

        await page.locator('.shopping_cart_link')
            .click();

        await page.locator('[data-test="remove-sauce-labs-backpack"]')
            .click();

        await expect(page.locator('.cart_item'))
            .toHaveCount(0);

        await expect(page.locator('.shopping_cart_badge'))
            .toBeHidden();
    });

    // TC26 - Continue shopping
    test('TC26 - Verify continue shopping functionality', async ({ page }) => {

        await page.locator('.shopping_cart_link')
            .click();

        await page.locator('[data-test="continue-shopping"]')
            .click();

        await expect(page).toHaveURL(/inventory.html/);

        await expect(page.locator('.title'))
            .toHaveText('Products');
    });

    // TC27 - Remove all products from cart
    test('TC27 - Verify empty shopping cart', async ({ page }) => {

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click();

        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
            .click();

        await page.locator('.shopping_cart_link')
            .click();

        await page.locator('[data-test="remove-sauce-labs-backpack"]')
            .click();

        await page.locator('[data-test="remove-sauce-labs-bike-light"]')
            .click();

        await expect(page.locator('.cart_item'))
            .toHaveCount(0);

        await expect(page.locator('.shopping_cart_badge'))
            .toBeHidden();
    });

});
