import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../../src/components/Navbar/Navbar";


// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  NavLink: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn(),
}));

describe("Navbar Component", () => {
  test("renders Navbar with correct links", () => {
    render(<Navbar isLoggedIn={false} />);

    expect(screen.getByTestId("brandName")).toHaveTextContent("PlanD");
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Create Plan")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();
  });

  test("shows Register and Login buttons when user is not logged in", () => {
    render(<Navbar isLoggedIn={false} />);

    expect(screen.getByTestId("UserSignUp_Button")).toBeInTheDocument();
    expect(screen.getByTestId("UserLogin_Button")).toBeInTheDocument();
  });

  test("shows Logout button when user is logged in", () => {
    render(<Navbar isLoggedIn={true} />);

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("logs out when Logout button is clicked", () => {
    const mockSetIsLoggedIn = jest.fn();
    render(<Navbar isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />);

    fireEvent.click(screen.getByText("Logout"));

    expect(mockSetIsLoggedIn).toHaveBeenCalledWith(false);
  });
});
