import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createNewEvent, updateExistingEvent, deleteExistingEvent } from "../../redux/store";
import emailjs from "@emailjs/browser"; // Import EmailJS
import "./CreateEvent.css";

const CreateEvent = ({ isOpen, onClose, selectedDateTime, editingEvent }) => {
  const dispatch = useDispatch();

  // Track if form is in "edit mode"
  const [isEditing, setIsEditing] = useState(editingEvent ? false : true); //  Allow immediate input for new events


  // Use empty strings as default to prevent uncontrolled input warnings
  const [eventTitle, setEventTitle] = useState(editingEvent?.title || "");
  const [attendees, setAttendees] = useState(editingEvent?.attendees || "");
  const [description, setDescription] = useState(editingEvent?.description || "");
  const [eventDate, setEventDate] = useState(editingEvent?.start?.split("T")[0] || selectedDateTime?.date || "");
  const [eventTime, setEventTime] = useState(
    editingEvent?.time || selectedDateTime?.time || "00:00"
  );
  
  useEffect(() => {
    if (editingEvent) {
      setEventTitle(editingEvent.title || "");
      setAttendees(editingEvent.attendees || "");
      setDescription(editingEvent.description || "");
      setEventDate(editingEvent.start?.split("T")[0] || "");
      setEventTime(editingEvent.time || "00:00"); //  Ensure time is correctly set
    } else {
      setEventTitle("");
      setAttendees("");
      setDescription("");
      setEventDate(selectedDateTime?.date || "");
      setEventTime(selectedDateTime?.time || "00:00"); //  Ensure correct default time
    }
  }, [editingEvent, selectedDateTime]);
  

  if (!isOpen) return null;

  const handleEdit = () => {
    setIsEditing(true);
  };


//Function to send email notifications
const sendEmailToAttendees = (eventData) => {
  const emailsArray = attendees.split(",").map(email => email.trim()); // Convert comma-separated emails to array

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
    if (!eventTitle.trim()) {
      alert("Event title is required!");
      return;
    }
  
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      alert("User not found! Please log in again.");
      return;
    }
  
    const newEvent = {
      id: editingEvent?.id || undefined, //  New events will get an ID from the backend
      title: eventTitle,
      start: `${eventDate}T${eventTime}`,
      description,
      attendees,
      createdBy: loggedInUser.email,
    };
  
    if (editingEvent) {
      console.log("Updating event:", newEvent);
      dispatch(updateExistingEvent(newEvent)); //  Update event
    } else {
      console.log("Creating new event:", newEvent);
      dispatch(createNewEvent(newEvent)); //  Create event
      sendEmailToAttendees(newEvent); // Send emails after creating an event
    }
  
    onClose();
  };
  
  

  const handleDelete = () => {
    if (editingEvent && editingEvent.id) {
      dispatch(deleteExistingEvent(editingEvent.id)); //  Ensure event ID exists
      onClose();
    }
  };

  return (
    <div className="create-event-overlay">
      <div className="create-event-container">
        <button className="create-event-back" onClick={onClose}></button>

        <h2 className="create-event-title">{editingEvent ? "Event Details" : "Create Event"}</h2>

        <label className="create-event-label">Event Title</label>
        <input
          type="text"
          className="create-event-input"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Enter event title"
          disabled={!isEditing} //  Editable only in edit mode
        />

        <label className="create-event-label">Date</label>
        <input
          type="text"
          className="create-event-input read-only"
          value={eventDate}
          readOnly //  Prevents editing
        />

        <label className="create-event-label">Time</label>
        <input
          type="time"
          className="create-event-input read-only"
          value={eventTime}
          readOnly //  Prevents editing
        />

        <label className="create-event-label">Attendees</label>
        <input
          type="email"
          className="create-event-input"
          value={attendees}
          onChange={(e) => setAttendees(e.target.value)}
          placeholder="example@mail.com"
          disabled={!isEditing} //  Editable only in edit mode
        />

        <label className="create-event-label">Event Description</label>
        <textarea
          className="create-event-textarea"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter event details"
          disabled={!isEditing} //  Editable only in edit mode
        ></textarea>

        {isEditing ? (
          <button className="create-event-submit" onClick={handleSubmit}>
            Save Changes
          </button>
        ) : (
          <button className="create-event-edit" onClick={handleEdit}>
            Edit Event
          </button>
        )}

        {editingEvent && (
          <button className="create-event-delete" onClick={handleDelete}>
            Delete Event
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
