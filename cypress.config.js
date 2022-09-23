const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://todo.csornyei.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
