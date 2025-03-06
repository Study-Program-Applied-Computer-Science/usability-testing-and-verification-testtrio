import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadEvents } from "../../../redux/store";
import "./MyEvents.css";


const MyEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const events = useSelector((state) => state.events);

  useEffect(() => {
    if (loggedInUser) {
      dispatch(loadEvents());
    }
  }, [dispatch, loggedInUser]);

  return (
    <div className="events-list">
    {events.length === 0 ? (
      <p>No events found.</p>
    ) : (
      events.map((event) => (
        <div key={event.id} className="event-card" onClick={() => navigate(`/events/${event.id}`)}>
          <div className="event-content">
            <h3>{event.title}</h3>
            <p><span>Date:</span> {new Date(event.start).toLocaleString()}</p>
            <p><span>Created by:</span> {event.createdBy}</p>
          </div>
        </div>
      ))
    )}
 </div> 
 
  );
};

export default MyEvents;
