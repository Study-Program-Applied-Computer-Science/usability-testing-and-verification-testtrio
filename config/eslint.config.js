import globals from "globals";
import pluginJs from "@eslint/js";
import cypressPlugin from "eslint-plugin-cypress";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Include Node.js globals if needed
      },
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      cypress: cypressPlugin,
    },
    extends: ["plugin:cypress/recommended"], // Extend Cypress rules
    environments: {
      "cypress/globals": true, // Allow `describe`, `it`, and `cy`
    },
  },
];
