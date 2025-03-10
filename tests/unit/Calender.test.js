import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMockStore } from "../../src/utils/mock-store";
import Calender from "../../src/components/Calender/Calender";

describe("Calender Component", () => {
  let store;

  beforeEach(() => {
    store = createMockStore({ events: [] }); // ✅ Initialize with empty events
  });

  test("renders Calender component correctly", () => {
    render(
      <Provider store={store}>
        <Calender />
      </Provider>
    );

    expect(screen.getByText(/today/i)).toBeInTheDocument();

    // ✅ Fix: Use `getAllByText` since "day" appears multiple times
    const dayButtons = screen.getAllByText(/day/i);
    expect(dayButtons.length).toBeGreaterThan(0); // ✅ Ensure at least one match

    expect(screen.getByText(/week/i)).toBeInTheDocument();
    expect(screen.getByText(/month/i)).toBeInTheDocument();
  });
});
