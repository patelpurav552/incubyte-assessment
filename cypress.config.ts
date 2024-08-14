import { defineConfig } from "cypress";

export default defineConfig({

  e2e: {
    baseUrl: "https://magento.softwaretestingboard.com/",
    supportFile: "cypress/support/e2e.ts",
    testIsolation: false,
    viewportHeight: 720,
    viewportWidth: 1280,
    experimentalMemoryManagement: true,
    retries: { 
      "runMode": 0, 
      "openMode": 0
    },

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
