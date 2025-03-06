import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import "./EventDetails.css"; 

const API_URL = "http://localhost:3001/events";

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/${eventId}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (!event) return <p>Loading event details...</p>;

  return (
    <div className="event-details-container">
      <div className="event-details-card">
        <button className="back-circle-button" onClick={() => navigate(-1)}>
          ←
        </button>

        <h2>{event.title}</h2>

        <div className="event-info">
          <i className="fas fa-calendar-alt"></i>
          <p><strong>Date & Time:</strong> {event.start ? new Date(event.start).toLocaleString() : "N/A"}</p>
        </div>

        <div className="event-info">
          <i className="fas fa-align-left"></i>
          <p><strong>Description:</strong> {event.description || "No description provided"}</p>
        </div>

        <div className="event-info">
          <i className="fas fa-user"></i>
          <p><strong>Created By:</strong> {event.createdBy || "Unknown"}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
