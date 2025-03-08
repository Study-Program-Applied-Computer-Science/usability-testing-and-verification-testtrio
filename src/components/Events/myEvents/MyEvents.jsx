import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadEvents } from "../../../redux/store";
import "./MyEvents.css";
import InfiniteScroll from "react-infinite-scroll-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const allEvents = useSelector((state) => state.events);

  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedDate, setSelectedDate] = useState(null); // New Date Filter

  // Load events only once
  useEffect(() => {
    if (allEvents.length === 0) {
      dispatch(loadEvents());
    }
  }, [dispatch, allEvents.length]);

  // Load user-specific events and apply filters
  useEffect(() => {
    if (!allEvents || !loggedInUser) return;

    // Filter events created by the logged-in user
    const eventsCreatedByUser = allEvents.filter(event => event.userId === loggedInUser.id);

    // Apply search and filter logic
    const filteredEvents = eventsCreatedByUser.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());

        // Extract event hour in 12-hour format
        const eventDate = new Date(event.start);
        const eventHour = eventDate.getHours() % 12 || 12;
        const eventPeriod = eventDate.getHours() >= 12 ? "PM" : "AM";

        // Date Filtering Logic
        const matchesDate = selectedDate ? eventDate.toDateString() === selectedDate.toDateString() : true;
        const matchesTime = selectedTime ? eventHour === parseInt(selectedTime, 10) : true;
        const matchesPeriod = selectedPeriod ? eventPeriod === selectedPeriod : true;

        return matchesSearch && matchesTime && matchesPeriod && matchesDate;
    });

    // Only update state if the filtered list has changed
    if (JSON.stringify(filteredEvents) !== JSON.stringify(userEvents)) {
        setUserEvents(filteredEvents);
        setDisplayedEvents(filteredEvents.slice(0, 5));
        setHasMore(filteredEvents.length > 5);
    }

    setLoading(false);

}, [allEvents, loggedInUser, searchTerm, selectedTime, selectedPeriod, selectedDate, userEvents]);


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
      <button className="back-button" onClick={() => navigate(-1)}>←</button>

      <div className="filters">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <select onChange={(e) => setSelectedTime(e.target.value)} value={selectedTime} className="time-dropdown">
          <option value="">Select Time</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        <select onChange={(e) => setSelectedPeriod(e.target.value)} value={selectedPeriod} className="period-dropdown">
          <option value="">AM/PM</option>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
        
        {/* Date Picker Filter */}
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="Select Date"
          className="date-picker"
        />
      </div>
     

{/* Clear Date Button */}
{selectedDate && (
  <button className="clear-date-btn" onClick={() => setSelectedDate(null)}>
    Clear Date
  </button>
)}

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
