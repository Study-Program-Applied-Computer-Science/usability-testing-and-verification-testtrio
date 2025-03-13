import React, { useState, useEffect } from "react"; 
import { useDispatch } from "react-redux";
import { createNewEvent, updateExistingEvent, deleteExistingEvent } from "../../redux/store";
import emailjs from "@emailjs/browser";
import "./CreateEvent.css";

const CreateEvent = ({ isOpen, onClose, selectedDateTime, editingEvent }) => {
  const dispatch = useDispatch();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const [isEditing, setIsEditing] = useState(editingEvent ? false : true);
  const [eventTitle, setEventTitle] = useState(editingEvent?.title || "");
  const [attendees, setAttendees] = useState(editingEvent?.attendees || "");
  const [description, setDescription] = useState(editingEvent?.description || "");
  const [eventDate, setEventDate] = useState(editingEvent?.start?.split("T")[0] || selectedDateTime?.date || "");
  const [eventTime, setEventTime] = useState(editingEvent?.time || selectedDateTime?.time || "00:00");

  useEffect(() => {
    if (editingEvent) {
      setEventTitle(editingEvent.title || "");
      setAttendees(editingEvent.attendees || "");
      setDescription(editingEvent.description || "");
      setEventDate(editingEvent.start?.split("T")[0] || "");
      setEventTime(new Date(editingEvent.start).toTimeString().slice(0, 5));
    } else if (selectedDateTime) { 
      setEventDate(selectedDateTime.date || "");
      setEventTime(selectedDateTime.time || "00:00");
    }
  }, [editingEvent, selectedDateTime]);
  

  if (!isOpen) return null;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const sendEmailToAttendees = (eventData) => {
    const emailsArray = attendees.split(",").map(email => email.trim());

    emailsArray.forEach((email) => {
      const templateParams = {
        to_email: email,
        event_title: eventData.title,
        event_date: eventData.start.split("T")[0],
        event_time: eventData.start.split("T")[1],
        event_description: eventData.description,
      };

      emailjs
        .send("service_6vt23rp", "template_p7jcw39", templateParams, "Ze0w0JPzUnSTMDqSE")
        .then((response) => {
          console.log("Email sent successfully:", response);
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
    });
  };

  const handleSubmit = async () => {
    if (!eventTitle.trim() || !attendees.trim() || !description.trim()) {
      alert("All fields are required!");
      return;
    }

    if (!loggedInUser) {
      alert("User not found! Please log in again.");
      return;
    }

    const newEvent = {
      id: editingEvent?.id || undefined,
      title: eventTitle,
      start: `${eventDate}T${eventTime}`,
      description,
      attendees,
      createdBy: loggedInUser.email,
    };

    if (editingEvent) {
      if (editingEvent.createdBy !== loggedInUser.email) {
        alert("You can only edit your own events.");
        return;
      }
      dispatch(updateExistingEvent(newEvent));
      alert("Event updated successfully!");
    } else {
      dispatch(createNewEvent(newEvent));
      sendEmailToAttendees(newEvent);
      alert("Event created successfully!");
    }

    onClose();
  };

  const handleDelete = () => {
    if (!editingEvent || !editingEvent.id) return;

    if (editingEvent.createdBy !== loggedInUser.email) {
      alert("You can only delete your own events.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      dispatch(deleteExistingEvent(editingEvent.id));
      alert("Event deleted successfully!");
      onClose();
    }
  };

  return (
    <div className="create-event-overlay">
      <div className="create-event-container" data-testid="create-event-container">
      <button className="create-event-back" data-testid="back-button" onClick={onClose}></button>


        <h2 className="create-event-title">{editingEvent ? "Event Details" : "Create Event"}</h2>

        <label className="create-event-label">Event Title</label>
        <input type="text" className="create-event-input" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="Enter event title" disabled={!isEditing} required />

        <label className="create-event-label">Date</label>
        <input type="text" className="create-event-input read-only" value={eventDate} readOnly />

        <label className="create-event-label">Time</label>
        <input type="time" className="create-event-input read-only" value={eventTime} readOnly />

        <label className="create-event-label">Attendees</label>
        <input type="email" className="create-event-input" value={attendees} onChange={(e) => setAttendees(e.target.value)} placeholder="example@mail.com" disabled={!isEditing} required />

        <label className="create-event-label">Event Description</label>
        <textarea className="create-event-textarea" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter event details" disabled={!isEditing} required></textarea>

        {editingEvent && !isEditing ? (
          <div className="button-group">
            <button data-testid="create-event-form" className="create-event-edit" onClick={handleEdit}>Edit Event</button>
            <button className="create-event-delete" onClick={handleDelete}>Delete Event</button>
          </div>
        ) : (
          <button  className="create-event-submit" onClick={handleSubmit}>
            {editingEvent ? "Save Changes" : "Create Event"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
