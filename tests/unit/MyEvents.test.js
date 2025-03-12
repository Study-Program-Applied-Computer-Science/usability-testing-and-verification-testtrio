import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MyEvents from "../../src/components/Events/myEvents/MyEvents";
import { deleteExistingEvent } from "../../src/redux/store";

jest.mock("../../src/redux/store", () => ({
  loadEvents: jest.fn(() => ({ type: "LOAD_EVENTS" })),
  deleteExistingEvent: jest.fn((id) => ({ type: "DELETE_EVENT", payload: id })),
}));

const mockStore = configureStore([]);
let store;
let mockDispatch;

beforeEach(() => {
  store = mockStore({
    events: [
      { id: "1", title: "Meeting", start: "2025-03-11T10:00:00", createdBy: "test@example.com" },
      { id: "2", title: "Conference", start: "2025-03-12T14:00:00", createdBy: "test@example.com" },
    ],
  });

  mockDispatch = jest.fn();
  store.dispatch = mockDispatch;

  jest.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
    if (key === "loggedInUser") {
      return JSON.stringify({ email: "test@example.com" });
    }
    return null;
  });

  jest.spyOn(window, "alert").mockImplementation(() => {});
  jest.spyOn(window, "confirm").mockImplementation(() => true);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("MyEvents Component", () => {
  test("renders the component and displays user events", () => {
    render(
      <Provider store={store}>
        <MyEvents />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Search events...")).toBeInTheDocument();
    expect(screen.getByText("Meeting")).toBeInTheDocument();
    expect(screen.getByText("Conference")).toBeInTheDocument();
  });

  test("dispatches loadEvents on mount", () => {
    render(
      <Provider store={store}>
        <MyEvents />
      </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Object));
  });

  test("opens the event popup when an event is clicked", async () => {
    render(
      <Provider store={store}>
        <MyEvents />
      </Provider>
    );

    fireEvent.click(screen.getByText("Meeting"));

    expect(await screen.findByText(/Event Details/i)).toBeInTheDocument();
  });

  test("deletes an event when delete button is clicked", async () => {
    render(
      <Provider store={store}>
        <MyEvents />
      </Provider>
    );

    fireEvent.click(screen.getByText("Meeting"));

    const deleteButton = await screen.findByRole("button", { name: /Delete Event/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(deleteExistingEvent("1"));
    });
  });
  
  

  test("shows 'No events found' if no events match filter", () => {
    store = mockStore({ events: [] });

    render(
      <Provider store={store}>
        <MyEvents />
      </Provider>
    );

    expect(screen.getByText("No events found.")).toBeInTheDocument();
  });
});
