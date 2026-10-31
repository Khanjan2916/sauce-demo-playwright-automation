 // API01 - Your existing test

const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://www.saucedemo.com';

test.describe('Sauce Demo - API Tests', () => {

    test('API01 - Verify website responds successfully', async ({ request }) => {

        // Send GET request to the website
        const response = await request.get(BASE_URL);

        // Verify status code is 200
        expect(response.status()).toBe(200);

        // Get website response body
        const responseBody = await response.text();

        // Verify website title text exists
        expect(responseBody).toContain('Swag Labs');

        console.log('Status Code:', response.status());
        console.log('Website response received successfully');

    });

});

// API02 - Add this new test
    test('API02 - Verify response content type', async ({ request }) => {
        const response = await request.get(BASE_URL);

        const contentType = response.headers()['content-type'];

        expect(contentType).toContain('text/html');

        console.log('Content Type:', contentType);
    });

    
test('API03 - Verify website response time', async ({ request }) => {

    const startTime = Date.now();

    const response = await request.get(BASE_URL);

    const endTime = Date.now();

    const responseTime = endTime - startTime;

    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(5000);

    console.log('Response Time:', responseTime, 'ms');

});


test('API04 - Verify website response is not empty', async ({ request }) => {

    const response = await request.get(BASE_URL);

    const responseBody = await response.text();

    expect(responseBody.length).toBeGreaterThan(0);

    console.log('Response body length:', responseBody.length);

});


test('API05 - Verify website HTML contains application root', async ({ request }) => {

    const response = await request.get(BASE_URL);

    const responseBody = await response.text();

    expect(responseBody).toContain('<div id="root"></div>');
    expect(responseBody).toContain('Swag Labs');

    console.log('Application root found successfully');

});
