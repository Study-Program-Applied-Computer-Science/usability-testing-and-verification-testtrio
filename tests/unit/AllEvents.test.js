import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AllEvents from "../../src/components/Events/allEvents/AllEvents";

describe("AllEvents Component", () => {

  test("it will renders AllEvents component without crashing", () => {
    render(<AllEvents />);
    expect(screen.getByTestId("all-events-container")).toBeInTheDocument();
  });

  test("test for displaying 'No content available yet.' message", () => {
    render(<AllEvents />);
    const messageElement = screen.getByText(/No content available yet./i);
    expect(messageElement).toBeInTheDocument();
  });

  test("applies the correct class to the container", () => {
    render(<AllEvents />);
    const containerElement = screen.getByTestId("all-events-container");
    expect(containerElement).toHaveClass("all-events-container");
  });

});
