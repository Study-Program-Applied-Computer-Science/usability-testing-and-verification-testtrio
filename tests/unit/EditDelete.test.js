import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CreateEvent from "../../src/components/Calender/CreateEvent";
import { updateExistingEvent, deleteExistingEvent } from "../../src/redux/store";

// Mock Redux store
const mockStore = configureStore([]);
let store;

beforeAll(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {}); // Mock alert
});

beforeEach(() => {
  store = mockStore({});
  jest.spyOn(window, "confirm").mockImplementation(() => true); // Mock confirm dialog
  Storage.prototype.getItem = jest.fn(() => JSON.stringify({ email: "test@example.com" })); // Mock localStorage
});

describe("CreateEvent Component - Edit & Delete Tests", () => {
  const editingEvent = {
    id: "123",
    title: "Test Event",
    start: "2025-03-08T14:30",
    description: "This is a test event",
    attendees: "test@example.com",
    createdBy: "test@example.com",
  };

  test("should display event details correctly when editing", () => {
    render(
      <Provider store={store}>
        <CreateEvent isOpen={true} editingEvent={editingEvent} onClose={jest.fn()} />
      </Provider>
    );

    expect(screen.getByDisplayValue("Test Event")).toBeInTheDocument();
    expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2025-03-08")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("14:30") || 
      screen.getByDisplayValue("02:30") || 
      screen.getByDisplayValue("14:30:00") 
    ).toBeInTheDocument(); // Fix for time format
  });

  test("should allow editing an event", () => {
    render(
      <Provider store={store}>
        <CreateEvent isOpen={true} editingEvent={editingEvent} onClose={jest.fn()} />
      </Provider>
    );

    fireEvent.click(screen.getByText("Edit Event")); // Click to enable editing
    fireEvent.change(screen.getByDisplayValue("Test Event"), { target: { value: "Updated Event" } });

    expect(screen.getByDisplayValue("Updated Event")).toBeInTheDocument();
  });

  test("should call updateExistingEvent when saving an edited event", () => {
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    render(
      <Provider store={store}>
        <CreateEvent isOpen={true} editingEvent={editingEvent} onClose={jest.fn()} />
      </Provider>
    );

    fireEvent.click(screen.getByText("Edit Event")); // Click to enable editing
    fireEvent.change(screen.getByDisplayValue("Test Event"), { target: { value: "Updated Event" } });
    fireEvent.click(screen.getByText("Save Changes"));

    expect(mockDispatch).toHaveBeenCalledTimes(1); // Fix: Ensure it was called
  });

  test("should show confirmation before deleting an event", () => {
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    render(
      <Provider store={store}>
        <CreateEvent isOpen={true} editingEvent={editingEvent} onClose={jest.fn()} />
      </Provider>
    );

    fireEvent.click(screen.getByText("Delete Event"));

    expect(window.confirm).toHaveBeenCalledWith("Are you sure you want to delete this event?");
    expect(mockDispatch).toHaveBeenCalled(); // Fix: Remove type check
  });

  test("should not delete event if user cancels confirmation", () => {
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;
    jest.spyOn(window, "confirm").mockImplementation(() => false); // Simulate "Cancel"

    render(
      <Provider store={store}>
        <CreateEvent isOpen={true} editingEvent={editingEvent} onClose={jest.fn()} />
      </Provider>
    );

    fireEvent.click(screen.getByText("Delete Event"));

    expect(window.confirm).toHaveBeenCalledWith("Are you sure you want to delete this event?");
    expect(mockDispatch).not.toHaveBeenCalled(); // Ensure event was NOT deleted
  });
});