module.exports = {
  rootDir: "../",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest", // ✅ Ensures Babel transforms JSX/TSX files
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(lodash-es|@fullcalendar|preact|@testing-library)/)", // ✅ Ensure Jest transforms ESM dependencies
  ],
  setupFilesAfterEnv: ["<rootDir>/tests/unit/setupTests.js"], // ✅ Ensure Jest setup is executed before tests
  testMatch: ["<rootDir>/tests/unit/**/*.test.js"], // ✅ Ensure Jest only looks for test files inside `tests/unit/`
  verbose: true, // ✅ Enable verbose output to help debug test issues

  // ✅ Enable coverage collection
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],

  // ✅ Exclude specific files from coverage
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/redux/**",         // Exclude Redux directory
    "!src/utils/**",         // Exclude Utils directory
    "!src/App.jsx",          // Exclude App.jsx
    "!src/const.js",         // Exclude const.js
    "!src/main.jsx",         // Exclude main.jsx
    "!src/components/Events/Events.jsx",     // Exclude Events.jsx
    "!src/components/Events/allEvents.jsx",  // Exclude AllEvents.jsx
  ],
};
