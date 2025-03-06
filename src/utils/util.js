const API_URL = "http://localhost:3001/events"; // JSON Server endpoint

/**
 * ✅ Fetch all events from `db.json`
 */
export const fetchEvents = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch events");

    const events = await response.json();
    return Array.isArray(events) ? events : []; // Ensure it always returns an array
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

/**
 * ✅ Create a new event & store it in `db.json`
 */
export const createEvent = async (eventData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) throw new Error("Failed to create event");

    return await response.json(); // ✅ Return the newly created event (including the ID)
  } catch (error) {
    console.error("Error creating event:", error);
    return null;
  }
};

/**
 * ✅ Update an existing event in `db.json`
 */
export const updateEvent = async (eventData) => {
  if (!eventData.id) {
    console.error("Error: Event ID is missing for update.");
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/${eventData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) throw new Error("Failed to update event");

    return await response.json();
  } catch (error) {
    console.error("Error updating event:", error);
    return null;
  }
};

/**
 * ✅ Delete an event from `db.json`
 */
export const deleteEvent = async (eventId) => {
  if (!eventId) {
    console.error("Error: Event ID is missing for deletion.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${eventId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete event");

    console.log(`Event ${eventId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting event:", error);
  }
};
