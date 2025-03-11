import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; 
import MyEvents from "../../src/components/Events/myEvents/MyEvents";
import { setEvents } from "../../src/redux/store";

// ✅ Initialize mock store
const mockStore = configureStore([]);

describe("MyEvents Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      events: [], // ✅ Initial empty state
    });
    store.dispatch = jest.fn(); // ✅ Mock dispatch function

    localStorage.setItem("loggedInUser", JSON.stringify({ email: "mohithtummala.mt@gmail.com" }));
  });

  test("renders MyEvents component properly", () => {
    render(
      <Provider store={store}>
        <MyEvents />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Search events...")).toBeInTheDocument();
  });

   
});