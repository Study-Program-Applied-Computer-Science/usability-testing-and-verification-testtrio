const API_URL = "http://localhost:3001/events"; // Assuming "events" in db.json

export const fetchEvents = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch events");
    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) throw new Error("Failed to create event");

    return await response.json();
  } catch (error) {
    console.error("Error creating event:", error);
  }
};
