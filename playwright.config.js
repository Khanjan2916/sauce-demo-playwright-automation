
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

    testDir: '.',

    testMatch: [
        'tests/**/*.spec.js',
        'api-tests/**/*.spec.js',
        'database-tests/**/*.spec.js'
    ],

    fullyParallel: true,

    reporter: [
        ['list'],
        ['html', { open: 'never' }]
    ],

    use: {
        ...devices['Desktop Chrome'],
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure'
    }
});
