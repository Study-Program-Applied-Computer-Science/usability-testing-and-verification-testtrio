const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    defaultCommandTimeout: 10000,
    video: false,
    chromeWebSecurity: false, // ✅ Prevents login session issues
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
