import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MyEvents from "../../src/components/Events/myEvents/MyEvents";
import { loadEvents } from "../../src/redux/store";

// Mock Redux store
jest.mock("../../src/redux/store", () => ({
  loadEvents: jest.fn(() => ({ type: "LOAD_EVENTS" })),
}));

const mockStore = configureStore([]);
let store;
let mockDispatch;

beforeEach(() => {
  store = mockStore({
    events: Array.from({ length: 10 }, (_, i) => ({
      id: String(i + 1),
      title: `Event ${i + 1}`,
      start: "2025-03-11T10:00:00",
      createdBy: "test@example.com",
    })),
  });

  mockDispatch = jest.fn();
  store.dispatch = mockDispatch;

  jest.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
    if (key === "loggedInUser") {
      return JSON.stringify({ email: "test@example.com" });
    }
    return null;
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Infinite Scrolling in MyEvents Component", () => {
    test("triggers infinite scrolling and loads more events", async () => {
        render(
          <Provider store={store}>
            <MyEvents />
          </Provider>
        );
      
        const scrollableDiv = screen.getByTestId("scrollableDiv");
        expect(scrollableDiv).toBeInTheDocument();    
        
      
        //Simulate scrolling manually
        fireEvent.scroll(scrollableDiv, { target: { scrollTop: 1000 } });
      
        //Longer wait time (1000ms) to let the UI update properly
        await waitFor(() => {          
          expect(screen.getByText("Event 6")).toBeInTheDocument();
        }, { timeout: 2000 }); // Increased timeout for slow updates      
        
      });
      
});
