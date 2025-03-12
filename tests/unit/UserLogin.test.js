import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserLogin from "../../src/components/UserLogin/UserLogin";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

//Mock React Router navigation
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: null }),
}));

beforeEach(() => {
  fetchMock.resetMocks();
  jest.spyOn(Storage.prototype, "setItem");
  jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
  jest.spyOn(window, "alert").mockImplementation(() => {}); // Prevent actual alerts
});

describe("UserLogin Component", () => {
  test("renders sign-in form by default", () => {
    render(<UserLogin />);
    
    expect(screen.getByRole("heading", { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  test("toggles to sign-up form when clicking 'Sign Up'", () => {
    render(<UserLogin />);

    fireEvent.click(screen.getByText("Don't have an account? Sign Up"));

    expect(screen.getByRole("heading", { name: /Sign Up/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  test("handles successful login", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([{ username: "testuser", password: "password123", email: "test@example.com" }])
    );

    render(<UserLogin />);

    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith("isLoggedIn", JSON.stringify(true));
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("shows error for invalid login credentials", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ username: "testuser", password: "password123" }]));

    render(<UserLogin />);

    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "wronguser" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "wrongpass" } });
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Invalid username or password!");
    });
  });
  
test("handles successful sign-up", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([])); // No users exist
    fetchMock.mockResponseOnce(JSON.stringify({ username: "newuser", email: "new@example.com" }));

    render(<UserLogin />);

    fireEvent.click(screen.getByText("Don't have an account? Sign Up"));
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "new@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "newuser" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "newpass" } });
    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2); // First fetch users, then create new user
      expect(window.alert).toHaveBeenCalledWith("Sign Up Successful! Please Log In.");
    });
  });

  test("prevents duplicate sign-ups", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ email: "existing@example.com" }])); // User already exists

    render(<UserLogin />);

    fireEvent.click(screen.getByText("Don't have an account? Sign Up"));
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "existing@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Email is already registered! Please log in.");
    });
  });

});
