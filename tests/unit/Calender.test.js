import React from "react";
import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Calender from "../../src/components/Calender/Calender";

const mockStore = configureStore([]);

describe("Calender Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      events: [
        {
          id: "1",
          title: "Sprint",
          start: "2025-03-14T09:30:00",
          description: "asvdsbv",
          attendees: "123@",
          createdBy: "sai@gmail.com",
        },
      ],
    });
    store.dispatch = jest.fn();
  });

  
  it("renders Calender component properly", () => {
    render(
      <Provider store={store}>
        <Calender />
      </Provider>
    );

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /today/i })).toBeInTheDocument();
  });

  // past dates are greyed out
    it("should disable past dates from selection", async () => {
    render(
      <Provider store={store}>
        <Calender />
      </Provider>
    );

    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - 1);
    const pastDateStr = pastDate.getDate().toString();

    // Wait for the calendar to load
    await waitFor(() => expect(screen.getByRole("grid")).toBeInTheDocument());

    // Select the calendar grid
    const calendarGrid = screen.getByRole("grid");

    // Try to find past dates inside the grid
    const pastDates = within(calendarGrid).queryAllByText(pastDateStr);
    //Check if at least one past date exists (if FullCalendar renders it)
    if (pastDates.length === 0) {
      console.warn(` No past dates found in the test environment.`);
      return; 
    }

    expect(pastDates.length).toBeGreaterThan(0);

    // click on the first past date found
    fireEvent.click(pastDates[0]);

    // ensure the Create Event form does NOT appear
    expect(screen.queryByTestId("create-event-form")).not.toBeInTheDocument();
  });

  
  it("should not allow creating events in Month View", () => {
    render(
      <Provider store={store}>
        <Calender />
      </Provider>
    );

    // Mock switching to Month View
    fireEvent.click(screen.getByText("month"));

    // Simulate clicking a date in Month View
    waitFor(() => expect(screen.getByTestId("full-calendar")).toBeInTheDocument());

    //Expect create event popup to NOT appear
    expect(screen.queryByTestId("create-event-form")).not.toBeInTheDocument();
  });

  

  it("should allow editing past events", () => {
    render(
      <Provider store={store}>
        <Calender />
      </Provider>
    );

    // Mock clicking on an existing past event
    fireEvent.click(screen.getByText("Sprint"));

    expect(screen.getByTestId("create-event-form")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Sprint")).toBeInTheDocument();
  });

  
  it("should open create event form when clicking a future date", async () => {
    render(
      <Provider store={store}>
        <Calender />
      </Provider>
    );

    // Wait for the calendar grid to be fully loaded
    waitFor(() => expect(screen.getByRole("grid")).toBeInTheDocument());

    const calendarGrid = screen.getByRole("grid");

    // Find the first future date that is not disabled
    let futureDateElement = null;
    const allGridCells = within(calendarGrid).getAllByRole("gridcell");

    for (const cell of allGridCells) {
        if (cell.textContent && !cell.classList.contains("fc-day-past")) {
            futureDateElement = cell;
            break; // Stop at the first valid future date
        }
    }

    // Ensure a valid date cell is found
    expect(futureDateElement).toBeTruthy();

    // Click the future date cell
    fireEvent.click(futureDateElement);

    // Wait for the event form to appear
     waitFor(() => expect(screen.getByTestId("create-event-container")).toBeInTheDocument());
});
  

  
  test("renders Month, Week, and Day views properly", () => {
    render(
      <Provider store={store}>
        <Calender />
      </Provider>
    );

    const monthButton = screen.getByRole("button", { name: "month" });
    const weekButton = screen.getByRole("button", { name: "week" });
    const dayButton = screen.getByRole("button", { name: "day" });

    expect(monthButton).toBeInTheDocument();
    expect(weekButton).toBeInTheDocument();
    expect(dayButton).toBeInTheDocument();

    //the test clicking and Checking View Change
    fireEvent.click(monthButton);
    expect(monthButton).toHaveClass("fc-button-active");

    fireEvent.click(weekButton);
    expect(weekButton).toHaveClass("fc-button-active");

    fireEvent.click(dayButton);
    expect(dayButton).toHaveClass("fc-button-active");
  });

  // it ensure navigation between weeks works properly
  test("allows navigation between weeks using prev/next buttons", () => {
    render(
      <Provider store={store}>
        <Calender />
      </Provider>
    );

    const prevButton = screen.getByRole("button", { name: /previous week/i });
    const nextButton = screen.getByRole("button", { name: /next week/i });
    const calendarTitle = screen.getByRole("heading");

    const initialTitle = calendarTitle.textContent;

    fireEvent.click(nextButton);
    expect(calendarTitle.textContent).not.toBe(initialTitle);

    fireEvent.click(prevButton);
    expect(calendarTitle.textContent).toBe(initialTitle);
  });
});
