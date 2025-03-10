module.exports = {
  rootDir: "../",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest" // ✅ Ensures Babel transforms JSX/TSX files
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  transformIgnorePatterns: [
    "node_modules/(?!(lodash-es|@fullcalendar|preact|@testing-library)/)" // ✅ Ensure Jest transforms ESM dependencies
  ],
  setupFilesAfterEnv: ["<rootDir>/tests/unit/setupTests.js"], // ✅ Ensure Jest setup is executed before tests
  testMatch: ["<rootDir>/tests/unit/**/*.test.js"], // ✅ Ensure Jest only looks for test files inside `tests/unit/`
  verbose: true, // ✅ Enable verbose output to help debug test issues
};
