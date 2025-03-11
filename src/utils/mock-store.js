import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "../redux/store"; 

export function createMockStore(preloadedState = { events: [] }) {
  return configureStore({
    reducer: { events: eventsReducer.reducer },
    preloadedState,
  });
}
