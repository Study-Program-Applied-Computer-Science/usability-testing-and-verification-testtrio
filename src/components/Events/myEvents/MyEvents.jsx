import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadEvents } from "../../../redux/store";
import "./MyEvents.css";

const MyEvents = ({ events }) => {  // Accept events as a prop
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (loggedInUser) {
      dispatch(loadEvents()); // ✅ Fetch events only once when user is logged in
    }
  }, [dispatch, loggedInUser]); // ✅ Only re-runs if logged-in user changes

  // ✅ Filter only the logged-in user's events
  const myEvents = loggedInUser
    ? events.filter(event => event.createdBy === loggedInUser.username)
    : [];

  return (
    <div className="events-list">
      {myEvents.length === 0 ? (
        <p>No events found.</p>
      ) : (
        myEvents.map((event) => (
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
