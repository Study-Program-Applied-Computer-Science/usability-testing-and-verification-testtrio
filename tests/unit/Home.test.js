import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../../src/components/Home/Home";

// Mocking react-router-dom's useNavigate()
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

import { useNavigate } from "react-router-dom";

describe("Home Component", () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
  });

  // Test if Home component renders correctly
  test("renders Home component", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText("Personal Event Schedule App!")).toBeInTheDocument();
    expect(screen.getByText(/Stay organized effortlessly/)).toBeInTheDocument();
  });

  // Test if "Get Started" button navigates correctly
  test("navigates to Calendar page when 'Get Started' button is clicked", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const getStartedButton = screen.getByRole("button", { name: "Get Started" });
    fireEvent.click(getStartedButton);

    expect(mockNavigate).toHaveBeenCalledWith("/Calender", { state: { isSignUp: true } });
  });

  // Test if "Access Now" button navigates correctly
  test("navigates to Events page when 'Access Now' button is clicked", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const accessNowButton = screen.getByRole("button", { name: "Access Now" });
    fireEvent.click(accessNowButton);

    expect(mockNavigate).toHaveBeenCalledWith("/Events", { state: { isSignUp: true } });
  });

  // Test if the Footer component is rendered
  test("renders Footer component", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Instead of searching for "Footer", check the actual footer content
    expect(screen.getByText(/© 2024 All rights reserved/i)).toBeInTheDocument();
  });
});
