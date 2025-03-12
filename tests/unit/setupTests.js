import "@testing-library/jest-dom";
import "whatwg-fetch";



global.console = {
  ...console,
  error: jest.fn(), // Suppress errors in tests
  warn: jest.fn(),  // Suppress warnings in tests
};


global.localStorage = {
  getItem: jest.fn(() => JSON.stringify({ email: "test@example.com" })), // Mock a logged-in user
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
