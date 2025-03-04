import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addEvent } from "../../redux/store"; // Import Redux action
import "./CreateEvent.css";

const CreateEvent = ({ isOpen, onClose, selectedDateTime }) => {
  const dispatch = useDispatch();
  const [eventTitle, setEventTitle] = useState("");
  const [attendees, setAttendees] = useState("");
  const [description, setDescription] = useState("");
  const [eventTime, setEventTime] = useState(selectedDateTime.time);

  useEffect(() => {
    setEventTime(selectedDateTime.time);
  }, [selectedDateTime]);

  if (!isOpen) return null;

  const handleTimeChange = (e) => {
    const timeValue = e.target.value;
    const [hours, minutes] = timeValue.split(":");

    if (minutes > 59) {
      alert("Minutes cannot be more than 59!");
      return;
    }

    setEventTime(timeValue);
  };

  const disableKeyboardInput = (e) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    if (!eventTitle.trim()) {
      alert("Event title is required!");
      return;
    }

    const newEvent = {
      title: eventTitle,
      start: `${selectedDateTime.date}T${eventTime}`,
      description,
      attendees,
    };

    dispatch(addEvent(newEvent)); // Save event to Redux & JSON Server

    // Reset form fields after submission
    setEventTitle("");
    setAttendees("");
    setDescription("");
    setEventTime(selectedDateTime.time);

    onClose();
  };

  return (
    <div className="create-event-overlay">
      <div className="create-event-container">
        <button className="create-event-back" onClick={onClose}></button>

        <h2 className="create-event-title">Create Event</h2>

        <label className="create-event-label">Event Title</label>
        <input
          type="text"
          className="create-event-input"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Enter event title"
        />

        <label className="create-event-label">Date</label>
        <input type="text" className="create-event-input read-only" value={selectedDateTime.date} readOnly />

        <label className="create-event-label">Time</label>
        <input
          type="time"
          className="create-event-input"
          value={eventTime}
          onChange={handleTimeChange}
          onKeyDown={disableKeyboardInput}
        />

        <label className="create-event-label">Attendees</label>
        <input
          type="email"
          className="create-event-input"
          value={attendees}
          onChange={(e) => setAttendees(e.target.value)}
          placeholder="example@mail.com"
        />

        <label className="create-event-label">Event Description</label>
        <textarea
          className="create-event-textarea"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter event details"
        ></textarea>

        <button className="create-event-submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;
