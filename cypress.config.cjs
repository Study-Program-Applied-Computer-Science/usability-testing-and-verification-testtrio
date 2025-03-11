const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // ✅ Set your app's base URL
    supportFile: "cypress/support/e2e.js", // ✅ Use support file
    experimentalSessionAndOrigin: true, // ✅ Enable session preservation
  },
});
