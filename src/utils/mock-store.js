import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "../redux/store"; // ✅ Ensure this is correctly imported

export function createMockStore(preloadedState = { events: [] }) {
  return configureStore({
    reducer: { events: eventsReducer.reducer }, // ✅ Fix: Use `reducer` key correctly
    preloadedState,
  });
}
