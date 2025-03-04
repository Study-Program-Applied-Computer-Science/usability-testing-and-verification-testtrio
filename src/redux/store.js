import { configureStore, createSlice } from "@reduxjs/toolkit";
import { fetchEvents, createEvent } from "../utils/util";

const eventsSlice = createSlice({
  name: "events",
  initialState: [],
  reducers: {
    setEvents: (state, action) => action.payload,
    addEvent: (state, action) => {
      state.push(action.payload);
      createEvent(action.payload); // Store event in JSON Server
    },
  },
});

export const { setEvents, addEvent } = eventsSlice.actions;

export const loadEvents = () => async (dispatch) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) return;
  
    const allEvents = await fetchEvents();
    const userEvents = allEvents.filter(event => event.createdBy === loggedInUser.email); // ✅ Filter user-specific events
  
    dispatch(setEvents(userEvents));
  };

const store = configureStore({
  reducer: { events: eventsSlice.reducer },
});

export default store;
