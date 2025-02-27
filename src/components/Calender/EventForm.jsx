import React, { useState } from "react";
import "./EventForm.css";

const EventForm = ({ selectedDate, event, onSave, onClose }) => {
  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [time, setTime] = useState(event?.time || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, time });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{event ? "Event Details" : "Schedule an Event"}</h3>
        <p>
          {selectedDate.month} {selectedDate.day}, {selectedDate.year}
        </p>

        {event ? (
          <>
            <p><strong>Title:</strong> {event.title}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <div className="modal-actions">
              <button type="button" onClick={onClose}>Close</button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Event Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Event Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Event Time:</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            <div className="modal-actions">
              <button type="submit">Save</button>
              <button type="button" onClick={onClose}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EventForm;
