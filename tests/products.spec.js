
const { test, expect } = require('@playwright/test');

// ==========================================
// SAUCE DEMO - PRODUCT AUTOMATION TEST SUITE
// ==========================================

const URL = 'https://www.saucedemo.com/';

const USER = {
    username: 'standard_user',
    password: 'secret_sauce'
};

// ==========================================
// TEST SUITE
// ==========================================

test.describe('Sauce Demo - Product Functionality', () => {

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

    // TC09 - Verify product page
    test('TC09 - Verify product page is displayed', async ({ page }) => {

        await expect(page.locator('.title'))
            .toHaveText('Products');

        await expect(page.locator('.inventory_list'))
            .toBeVisible();
    });

    // TC10 - Verify total product count
    test('TC10 - Verify total number of products', async ({ page }) => {

        const products = page.locator('.inventory_item');

        await expect(products).toHaveCount(6);
    });

    // TC11 - Verify product names
    test('TC11 - Verify product names', async ({ page }) => {

        const productNames = await page
            .locator('.inventory_item_name')
            .allTextContents();

        expect(productNames).toContain('Sauce Labs Backpack');
        expect(productNames).toContain('Sauce Labs Bike Light');
        expect(productNames).toContain('Sauce Labs Bolt T-Shirt');
        expect(productNames).toContain('Sauce Labs Fleece Jacket');
        expect(productNames).toContain('Sauce Labs Onesie');
        expect(productNames).toContain('Test.allTheThings() T-Shirt (Red)');
    });

    // TC12 - Verify product prices
    test('TC12 - Verify product prices', async ({ page }) => {

        const prices = await page
            .locator('.inventory_item_price')
            .allTextContents();

        expect(prices).toHaveLength(6);

        for (const price of prices) {
            expect(price).toMatch(/^\$\d+\.\d{2}$/);
        }
    });

    // TC13 - Verify product images
    test('TC13 - Verify product images', async ({ page }) => {

        const images = page.locator('.inventory_item_img img');

        await expect(images).toHaveCount(6);

        for (const image of await images.all()) {
            await expect(image).toBeVisible();
            await expect(image).toHaveJSProperty('complete', true);
            await expect(image).not.toHaveJSProperty('naturalWidth', 0);
        }
    });

    // TC14 - Sort products A to Z
    test('TC14 - Sort products A to Z', async ({ page }) => {

        await page.locator('[data-test="product-sort-container"]')
            .selectOption('az');

        const names = await page
            .locator('.inventory_item_name')
            .allTextContents();

        const sortedNames = [...names].sort((a, b) =>
            a.localeCompare(b)
        );

        expect(names).toEqual(sortedNames);
    });

    // TC15 - Sort products Z to A
    test('TC15 - Sort products Z to A', async ({ page }) => {

        await page.locator('[data-test="product-sort-container"]')
            .selectOption('za');

        const names = await page
            .locator('.inventory_item_name')
            .allTextContents();

        const sortedNames = [...names].sort((a, b) =>
            b.localeCompare(a)
        );

        expect(names).toEqual(sortedNames);
    });

    // TC16 - Sort prices low to high
    test('TC16 - Sort prices low to high', async ({ page }) => {

        await page.locator('[data-test="product-sort-container"]')
            .selectOption('lohi');

        const prices = await page
            .locator('.inventory_item_price')
            .allTextContents();

        const numericPrices = prices.map(price =>
            Number(price.replace('$', ''))
        );

        const sortedPrices = [...numericPrices].sort((a, b) =>
            a - b
        );

        expect(numericPrices).toEqual(sortedPrices);
    });

    // TC17 - Sort prices high to low
    test('TC17 - Sort prices high to low', async ({ page }) => {

        await page.locator('[data-test="product-sort-container"]')
            .selectOption('hilo');

        const prices = await page
            .locator('.inventory_item_price')
            .allTextContents();

        const numericPrices = prices.map(price =>
            Number(price.replace('$', ''))
        );

        const sortedPrices = [...numericPrices].sort((a, b) =>
            b - a
        );

        expect(numericPrices).toEqual(sortedPrices);
    });

    // TC18 - Open product details
    test('TC18 - Verify product details page', async ({ page }) => {

        await page.locator('.inventory_item_name')
            .filter({ hasText: 'Sauce Labs Backpack' })
            .click();

        await expect(page).toHaveURL(/inventory-item.html/);

        await expect(page.locator('.inventory_details_name'))
            .toHaveText('Sauce Labs Backpack');

        await expect(page.locator('.inventory_details_price'))
            .toBeVisible();

        await expect(page.locator('.inventory_details_img'))
            .toBeVisible();
    });

});
