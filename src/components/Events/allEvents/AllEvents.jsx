import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadEvents } from "../../../redux/store";
import "./AllEvents.css";

const AllEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const events = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]);

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

export default AllEvents;
