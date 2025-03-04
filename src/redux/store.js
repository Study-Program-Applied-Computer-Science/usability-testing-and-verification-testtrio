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
  const events = await fetchEvents();
  dispatch(setEvents(events));
};

const store = configureStore({
  reducer: { events: eventsSlice.reducer },
});

export default store;
