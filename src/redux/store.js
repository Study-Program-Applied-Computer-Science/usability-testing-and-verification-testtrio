import { configureStore, createSlice } from "@reduxjs/toolkit";
import { fetchEvents, createEvent, updateEvent, deleteEvent } from "../utils/util";

const eventsSlice = createSlice({
  name: "events",
  initialState: [],
  reducers: {
    setEvents: (state, action) => action.payload, 
    addEvent: (state, action) => {
      if (action.payload && action.payload.id) {
        state.push(action.payload);
      }
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

/*
 Load only the events created by the logged-in user*/
export const loadEvents = () => async (dispatch) => {
  try {
    const events = await fetchEvents();
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      dispatch(setEvents([])); // If no user is logged in, don't load any events
      return;
    }

    // Filter events before storing them
    const userEvents = events.filter((event) => event.createdBy === loggedInUser.email);
    dispatch(setEvents(userEvents));
  } catch (error) {
    console.error("Error fetching events:", error);
    dispatch(setEvents([]));
  }
};

/**
 Create & Persist Event */
export const createNewEvent = (eventData) => async (dispatch) => {
  try {
    const newEvent = await createEvent(eventData);
    if (newEvent?.id) {
      dispatch(addEvent(newEvent));
    } else {
      console.error("Error: New event does not have a valid ID.");
    }
  } catch (error) {
    console.error("Error creating event:", error);
  }
};


/*Update Event*/
export const updateExistingEvent = (eventData) => async (dispatch) => {
  if (!eventData?.id) return;
  try {
    const updatedEvent = await updateEvent(eventData);
    if (updatedEvent?.id) {
      dispatch(editEvent(updatedEvent));
    }
  } catch (error) {
    console.error("Error updating event:", error);
  }
};

/*Delete Event from Redux & DB*/
export const deleteExistingEvent = (eventId) => async (dispatch) => {
  if (!eventId) return;
  try {
    await deleteEvent(eventId);
    dispatch(removeEvent(eventId));
  } catch (error) {
    console.error("Error deleting event:", error);
  }
};

const store = configureStore({
  reducer: { events: eventsSlice.reducer },
});

export default store;
