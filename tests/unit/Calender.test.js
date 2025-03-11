import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Calender from "../../src/components/Calender/Calender";

const mockStore = configureStore([]);

describe("Calender Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({ events: [] });
    store.dispatch = jest.fn();
  });

  // it test rendering the Calender component
  test("renders Calender component properly", () => {
    render(
      <Provider store={store}>
        <Calender />
      </Provider>
    );

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /today/i })).toBeInTheDocument();
  });



  // Test for all month, week and day views
  
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

    // test ting Click and Check View Change
    fireEvent.click(monthButton);
    expect(monthButton).toHaveClass("fc-button-active");

    fireEvent.click(weekButton);
    expect(weekButton).toHaveClass("fc-button-active");

    fireEvent.click(dayButton);
    expect(dayButton).toHaveClass("fc-button-active");
  });




  // it test navigating between weeks using slider buttons
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
