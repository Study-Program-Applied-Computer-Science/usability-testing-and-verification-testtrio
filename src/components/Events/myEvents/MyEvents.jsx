import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadEvents } from "../../../redux/store";
import "./MyEvents.css";
import InfiniteScroll from "react-infinite-scroll-component";

const MyEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const allEvents = useSelector((state) => state.events);

  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  // it Load events only once
  useEffect(() => {
    if (allEvents.length === 0) {
      dispatch(loadEvents());
    }
  }, [dispatch, allEvents.length]);

  // Load user-specific events ONCE
  useEffect(() => {
    if (loggedInUser && allEvents.length > 0) {
      const eventsCreatedByUser = allEvents.filter(event => event.createdBy === loggedInUser.email);

      //It prevent re-render loops by checking if events have changed
      if (JSON.stringify(userEvents) !==JSON.stringify(eventsCreatedByUser)) {
        setUserEvents(eventsCreatedByUser);
        setDisplayedEvents(eventsCreatedByUser.slice(0, 5));
        setHasMore(eventsCreatedByUser.length > 5);
        setLoading(false);
      }
    }
  }, [allEvents, loggedInUser]);

  // Fetch more events (pagination)
  const fetchMoreEvents = () => {
    if (!userEvents || displayedEvents.length >= userEvents.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      const nextEvents = userEvents.slice(displayedEvents.length, displayedEvents.length + 5);
      setDisplayedEvents((prevEvents) => [...prevEvents, ...nextEvents]);
    }, 1000);
   };

  return (
    <div className="events-list">
      <button className="back-button" onClick={() => navigate(-1)}>
        ←
      </button>

      {loading ? (<h3>Loading events...</h3>) : (
        <div id="scrollableDiv" style={{ overflowY: "auto", height: "80vh", maxHeight: "Calc(100vh - 100px)" }}>
          {/* React infinate scrolll*/}
          <InfiniteScroll
            dataLength={displayedEvents.length}
            next={fetchMoreEvents}
            hasMore={hasMore}
            loader={<h4>Loading more events...</h4>}
            endMessage={<p>No more events to show</p>}
            scrollableTarget="scrollableDiv"
          >
            {displayedEvents.map((event, index) => {
              const uniqueKey = `${event.id || "event"}-${index}`;
              return (
                <div key={uniqueKey} className="event-card" onClick={() => navigate(`/events/${event.id}`)}>
                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <p><span>Date:</span> {new Date(event.start).toLocaleString()}</p>
                    <p><span>Created by:</span> {event.createdBy}</p>
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
