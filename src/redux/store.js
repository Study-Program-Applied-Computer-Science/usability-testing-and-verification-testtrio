import { configureStore, createSlice } from "@reduxjs/toolkit";
import { fetchEvents, createEvent, updateEvent, deleteEvent } from "../utils/util";

const eventsSlice = createSlice({
  name: "events",
  initialState: [],
  reducers: {
    setEvents: (state, action) => action.payload,
    addEvent: (state, action) => {
      state.push(action.payload);
    },
    editEvent: (state, action) => {
      return state.map((event) => (event.id === action.payload.id ? action.payload : event));
    },
    removeEvent: (state, action) => {
      return state.filter((event) => event.id !== action.payload);
    },
  },
});

export const { setEvents, addEvent, editEvent, removeEvent } = eventsSlice.actions;

export const loadEvents = () => async (dispatch) => {
  const events = await fetchEvents();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const userEvents = events.filter((event) => event.createdBy === loggedInUser?.email); // Filter events by user
  dispatch(setEvents(userEvents));
};

export const createNewEvent = (eventData) => async (dispatch) => {
    const newEvent = await createEvent(eventData);
    if (newEvent?.id) {
      dispatch(addEvent(newEvent)); //  Ensure event ID exists before adding
    } else {
      console.error("Error: New event does not have a valid ID.");
    }
  };
  
  export const updateExistingEvent = (eventData) => async (dispatch) => {
    if (!eventData.id) {
      console.error("Error: Cannot update event without an ID.");
      return;
    }
  
    const updatedEvent = await updateEvent(eventData);
    if (updatedEvent?.id) {
      dispatch(editEvent(updatedEvent)); //  Ensure event ID exists before updating
    } else {
      console.error("Error: Updated event does not have a valid ID.");
    }
  };
  
  
  
  export const deleteExistingEvent = (eventId) => async (dispatch) => {
    if (!eventId) {
      console.error("Error: Cannot delete event without an ID.");
      return;
    }
  
    await deleteEvent(eventId);
    dispatch(removeEvent(eventId));
  };
  

const store = configureStore({
  reducer: { events: eventsSlice.reducer },
});

export default store;
