import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CreateEvent from "../../src/components/Calender/CreateEvent";

const mockStore = configureStore([]);

describe("CreateEvent Component", () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  // test for rendering create event
  test("renders CreateEvent component", () => {
    render(
      <Provider store={store}>
        <CreateEvent isOpen={true} onClose={jest.fn()} selectedDateTime={{ date: "2025-03-11", time: "12:00" }} />
      </Provider>
    );
    expect(screen.getByRole("heading", { name: "Create Event" })).toBeInTheDocument();

  });

  // test for data input
  test("allows input of event details", () => {
    render(
      <Provider store={store}>
        <CreateEvent isOpen={true} onClose={jest.fn()} selectedDateTime={{ date: "2025-03-11", time: "12:00" }} />
      </Provider>
    );
    const titleInput = screen.getByPlaceholderText("Enter event title");
    fireEvent.change(titleInput, { target: { value: "Team Meeting" } });
    expect(titleInput.value).toBe("Team Meeting");
  });

  // test for error
  test("displays error message if required fields are empty", () => {
    window.alert = jest.fn();
    render(
      <Provider store={store}>
        <CreateEvent isOpen={true} onClose={jest.fn()} selectedDateTime={{ date: "2025-03-11", time: "12:00" }} />
      </Provider>
    );
    fireEvent.click(screen.getByRole("button", { name: "Create Event" }));

    expect(window.alert).toHaveBeenCalledWith("All fields are required!");
  });

  // test for create event
  test("dispatches create event action", () => {
    window.alert = jest.fn();
    localStorage.setItem("loggedInUser", JSON.stringify({ email: "test@example.com" }));
    render(
      <Provider store={store}>
        <CreateEvent isOpen={true} onClose={jest.fn()} selectedDateTime={{ date: "2025-03-11", time: "12:00" }} />
      </Provider>
    );
    
    fireEvent.change(screen.getByPlaceholderText("Enter event title"), { target: { value: "Team Meeting" } });
    fireEvent.change(screen.getByPlaceholderText("example@mail.com"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Enter event details"), { target: { value: "Discuss project updates" } });
    
    fireEvent.click(screen.getByRole("button", { name: "Create Event" })); 

    expect(store.dispatch).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("Event created successfully!");
  });

  // test for back button 
  test("calls onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();
  
    render(
      <Provider store={store}>
        <CreateEvent isOpen={true} onClose={onCloseMock} selectedDateTime={{ date: "2025-03-11", time: "12:00" }} />
      </Provider>
    );
  
    const backButton = screen.getByTestId("back-button");
    expect(backButton).toBeInTheDocument();
  
    fireEvent.click(backButton);
  
    expect(onCloseMock).toHaveBeenCalled();
  });
  
  // test for edit
  test("pre-fills input fields when editing an event", () => {
    const editingEvent = {
      id: 1,
      title: "Project Review",
      start: "2025-03-11T12:00",
      attendees: "test@example.com",
      description: "Review project status",
      createdBy: "test@example.com"
    };
    render(
      <Provider store={store}>
        <CreateEvent isOpen={true} onClose={jest.fn()} editingEvent={editingEvent} />
      </Provider>
    );
    expect(screen.getByDisplayValue("Project Review")).toBeInTheDocument();
    expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Review project status")).toBeInTheDocument();
  });
});
