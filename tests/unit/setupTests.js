import "@testing-library/jest-dom";
import "whatwg-fetch"; // ✅ Mock `fetch` globally for Jest

// ✅ Optional: Mock console errors to avoid unnecessary noise in tests
global.console = {
  ...console,
  error: jest.fn(), // Suppress errors in tests
  warn: jest.fn(),  // Suppress warnings in tests
};

// ✅ Mock localStorage (if needed for authentication logic)
global.localStorage = {
  getItem: jest.fn(() => JSON.stringify({ email: "test@example.com" })), // Mock a logged-in user
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
