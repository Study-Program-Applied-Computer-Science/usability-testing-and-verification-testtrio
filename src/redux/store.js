import { configureStore, createSlice } from "@reduxjs/toolkit";
import { fetchEvents, createEvent, updateEvent, deleteEvent } from "../utils/util";

const eventsSlice = createSlice({
  name: "events",
  initialState: [],
  reducers: {
    setEvents: (state, action) => action.payload, // ✅ Set all events
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

/**
 * ✅ Load all events from `db.json`
 */
export const loadEvents = () => async (dispatch) => {
  try {
    const events = await fetchEvents();
    dispatch(setEvents(events)); // ✅ Store all events (both user and global)
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

/**
 * ✅ Create and persist event
 */
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

/**
 * ✅ Update event and persist changes
 */
export const updateExistingEvent = (eventData) => async (dispatch) => {
  if (!eventData.id) {
    console.error("Error: Cannot update event without an ID.");
    return;
  }

  try {
    const updatedEvent = await updateEvent(eventData);
    if (updatedEvent?.id) {
      dispatch(editEvent(updatedEvent));
    } else {
      console.error("Error: Updated event does not have a valid ID.");
    }
  } catch (error) {
    console.error("Error updating event:", error);
  }
};

/**
 * ✅ Delete event from `db.json`
 */
export const deleteExistingEvent = (eventId) => async (dispatch) => {
  if (!eventId) {
    console.error("Error: Cannot delete event without an ID.");
    return;
  }

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
