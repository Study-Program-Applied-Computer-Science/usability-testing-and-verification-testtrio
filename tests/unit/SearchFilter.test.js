import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux"; // Mocked Redux Hooks
import MyEvents from "../../src/components/Events/myEvents/MyEvents";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Search and Filter Functionality", () => {
  const mockEvents = [
    { id: "1", title: "Team Meeting", start: "2024-03-11T10:00:00" },
    { id: "2", title: "Project Review", start: "2024-03-11T14:00:00" },
    { id: "3", title: "Lunch Break", start: "2024-03-11T12:00:00" },
  ];

  beforeEach(() => {
    useSelector.mockImplementation((callback) => callback({ events: mockEvents }));
    useDispatch.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  test("should filter events based on search input", () => {
    render(<MyEvents />);

    expect(screen.getByText("Team Meeting")).toBeInTheDocument();
    expect(screen.getByText("Project Review")).toBeInTheDocument();
    expect(screen.getByText("Lunch Break")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Search events..."), {
      target: { value: "Project" },
    });

    expect(screen.getByText("Project Review")).toBeInTheDocument();
    expect(screen.queryByText("Team Meeting")).not.toBeInTheDocument();
    expect(screen.queryByText("Lunch Break")).not.toBeInTheDocument();
  });

  test("should filter events by selected date", () => {
    render(<MyEvents />);

    fireEvent.change(screen.getByPlaceholderText("Select Date"), {
      target: { value: "2024-03-11" },
    });

    expect(screen.getByText("Team Meeting")).toBeInTheDocument();
    expect(screen.getByText("Project Review")).toBeInTheDocument();
    expect(screen.getByText("Lunch Break")).toBeInTheDocument();
  });

  test("should filter events by time", () => {
    render(<MyEvents />);
  
    fireEvent.change(screen.getByTestId("time-select"), { target: { value: "10" } });
  
    expect(screen.getByText("Team Meeting")).toBeInTheDocument();
    expect(screen.queryByText("Project Review")).not.toBeInTheDocument();
    expect(screen.queryByText("Lunch Break")).not.toBeInTheDocument();
  });

  test("should show 'No events found' when no matches exist", () => {
    render(<MyEvents />);

    fireEvent.change(screen.getByPlaceholderText("Search events..."), {
      target: { value: "Nonexistent Event" },
    });

    expect(screen.getByText("No events found.")).toBeInTheDocument();
  });
});
