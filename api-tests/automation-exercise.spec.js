
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://automationexercise.com/api';

test.describe('Automation Exercise - REST API Tests', () => {

    test('API01 - Get all products list', async ({ request }) => {

        const response = await request.get(`${BASE_URL}/productsList`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody).toHaveProperty('products');
        expect(Array.isArray(responseBody.products)).toBe(true);

        console.log('Status Code:', response.status());
        console.log('Total Products:', responseBody.products.length);

    });

});
