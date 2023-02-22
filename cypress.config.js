const { defineConfig } = require("cypress");
const faker = require("@faker-js/faker");

module.exports = defineConfig({
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
        setupNodeEvents(on, config) {},

        baseUrl: "http://alphapay.netlify.app",
    },
});
