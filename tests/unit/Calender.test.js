import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMockStore } from "../../src/utils/mock-store";
import Calender from "../../src/components/Calender/Calender";

describe("Calender Component", () => {
  let store;

  beforeEach(() => {
    store = createMockStore({ events: [] });
  });

  // testing for week, day and month views T1

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





  // test regardind navigation buttons slider <> T2

  test("fullCalendar slider navigation works properly", () => {
    render(
      <Provider store={store}>
        <Calender />
      </Provider>
    );
  
    // Find navigation buttons
    const prevButton = screen.getByRole("button", { name: "Previous week" });
    const nextButton = screen.getByRole("button", { name: "Next week" });
    const currentTitle = screen.getByRole("heading");
  
    const initialTitle = currentTitle.textContent;
  
    // on clicking the slide navs right the title will change in our case the title in calenderview is month,date,year changes
    fireEvent.click(nextButton);
    expect(currentTitle.textContent).not.toBe(initialTitle);
  
    // on clicking the slide navs left the title will be back to previos initial one
    fireEvent.click(prevButton);
    expect(currentTitle.textContent).toBe(initialTitle);
  });




 
});