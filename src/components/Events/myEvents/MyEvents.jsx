import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadEvents, deleteExistingEvent } from "../../../redux/store";
import CreateEvent from "../../Calender/CreateEvent";
import "./MyEvents.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InfiniteScroll from "react-infinite-scroll-component";

const MyEvents = () => {
  const dispatch = useDispatch();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const allEvents = useSelector((state) => state.events || []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [displayedEvents, setDisplayedEvents] = useState([]); 
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]);
  

  // Get user-specific events
  const userEvents = allEvents.filter((event) => event.createdBy === loggedInUser?.email);

  // ffiltering events  logic applied below
  const filteredEvents = userEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const eventStartDate = new Date(event.start);
    const eventHour = eventStartDate.getHours() % 12 || 12;
    const eventPeriod = eventStartDate.getHours() >= 12 ? "PM" : "AM";
    const matchesDate =
      selectedDate && selectedDate instanceof Date
        ? eventStartDate.toDateString() === selectedDate.toDateString()
        : true;
    const matchesTime = selectedTime ? eventHour === parseInt(selectedTime, 10) : true;
    const matchesPeriod = selectedPeriod ? eventPeriod === selectedPeriod : true;

    return matchesSearch && matchesTime && matchesPeriod && matchesDate;
  });

  // below logic is wrapped up with useeffect hook for Infinite Scrolling- firstit will display 5 on scroll next 5
  useEffect(() => {
    setDisplayedEvents(filteredEvents.slice(0, 5)); 
    setHasMore(filteredEvents.length > 5);
  }, [searchTerm, selectedDate, selectedTime, selectedPeriod, allEvents]);

  const fetchMoreEvents = () => {
    console.log("Fetching more events...");
  
    if (!hasMore) {
      console.log("No more events to load!");
      return;
    }
  
    setTimeout(() => {
      const nextEvents = filteredEvents.slice(displayedEvents.length, displayedEvents.length + 5);
      console.log("Next events:", nextEvents);
  
      if (nextEvents.length === 0) {
        console.log("No more events available.");
        setHasMore(false);
        return;
      }
  
      setDisplayedEvents((prevEvents) => [...prevEvents, ...nextEvents]);
      setHasMore(displayedEvents.length + nextEvents.length < filteredEvents.length);
    }, 500);
  };

  // Open CreateEvent popup with event details
  const handleEventClick = (event) => {
    const eventStart = new Date(event.start);
    const eventTime = eventStart.toTimeString().slice(0, 5);
  
    setSelectedEvent({
      ...event,
      time: eventTime,
    });
  
    setShowEventPopup(true);
  };

  // handles event deletion & update UI immediately
  const handleDeleteEvent = (eventId) => {
    dispatch(deleteExistingEvent(eventId));
    setShowEventPopup(false);
  };
  

  return (
    <div className="events-list">
      <div className="filters">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <select onChange={(e) => setSelectedTime(e.target.value)} value={selectedTime} className="time-dropdown" data-testid="time-select">
          <option value="">Select Time</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        <select onChange={(e) => setSelectedPeriod(e.target.value)} value={selectedPeriod} className="period-dropdown">
          <option value="">AM/PM</option>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="Select Date"
          className="date-picker"
          data-testid="date-picker"
        />
      </div>

      {selectedDate && (
        <button data-testid="clear-date-btnn" className="clear-date-btn" onClick={() => setSelectedDate(null)}>
          Clear Date
        </button>
        
      )}
      

      <div className="events-container" id="scrollableDiv" data-testid="scrollableDiv" style={{ overflowY: "auto", height: "80vh", maxHeight: "Calc(100vh - 100px)" }}>
        {filteredEvents.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <InfiniteScroll
            dataLength={displayedEvents.length}
            next={fetchMoreEvents}
            hasMore={hasMore}
            loader={<h4>Loading more events...</h4>}
            endMessage={<p>No more events to show</p>}
            scrollableTarget="scrollableDiv"
          >
            {displayedEvents.map((event) => (
              <div key={event.id} className="event-card" onClick={() => handleEventClick(event)}>
                <div className="event-content">
                  <h3>{event.title}</h3>
                  <p>
                    <span>Date:</span> {new Date(event.start).toLocaleString()}
                  </p>
                  <p>
                    <span>Created by:</span> {event.createdBy}
                  </p>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        )}
      </div>

      {showEventPopup && (
        <CreateEvent
        isOpen={showEventPopup}
        onClose={() => setShowEventPopup(false)}
        selectedDateTime={{
          date: selectedEvent?.start ? selectedEvent.start.split("T")[0] : "",
          time: selectedEvent?.start
            ? new Date(selectedEvent.start).toTimeString().slice(0, 5)
            : "00:00",
        }}
        editingEvent={selectedEvent}
        onDelete={handleDeleteEvent}
      />
      
      
      )}
    </div>
  );
};

export default MyEvents;
