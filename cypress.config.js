const { defineConfig } = require("cypress");
const faker = require("@faker-js/faker");
const cypressSplit = require("cypress-split");

module.exports = defineConfig({
    reporter: 'mochawesome',
    reporterOptions: {
        useInlineDiffs: true,
        embeddedScreenshots: true,
        files: ["./mochawesome-report/*.json"],
        reportFilename: '[name].html',
        overwrite: false,
        html: false,
        json: true,
    },
    blockHosts: [],
    chromeWebSecurity: false,
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 30000,
    watchForFileChanges: false,
    viewportWidth: 1280,
    viewportHeight: 800,
    retries: {
        runMode: 2,
        openMode: 0,
    },
    env: {
        MAILOSAUR_API_KEY: "WguttN7DGiGOftq6",
    },

    e2e: {
        setupNodeEvents(on, config) {
            cypressSplit(on, config);
            return config;
        },

        baseUrl: "http://alphapay.netlify.app",
    },
});
