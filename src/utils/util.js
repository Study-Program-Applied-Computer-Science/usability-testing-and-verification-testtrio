const API_URL = "http://localhost:3001/events"; // JSON Server endpoint

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
  
      const createdEvent = await response.json();
      return { ...eventData, id: createdEvent.id }; //  JSON Server assigns ID
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
  
  

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
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  
