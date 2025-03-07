import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MyEvents from "./myEvents/MyEvents.jsx"; 
import AllEvents from "./allEvents/AllEvents.jsx"; 
import SearchFilter from "../SearchFilter/SearchFilter.jsx";

const Events = () => {
  const allEvents = useSelector((state) => state.events); // Get events from Redux
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("myEvents");  // ✅ Declare activeTab state

  useEffect(() => {
    if (allEvents.length > 0) {
      setFilteredEvents(allEvents);
    }
  }, [allEvents]); // ✅ Only updates when events change

  return (
    <div className="events-container">
      <div className="tab-buttons">
        <button
          className={activeTab === "myEvents" ? "active" : ""}
          onClick={() => setActiveTab("myEvents")}
        >
          My Events
        </button>
        <button
          className={activeTab === "allEvents" ? "active" : ""}
          onClick={() => setActiveTab("allEvents")}
        >
          All Events
        </button>
      </div>

      {/* Search Bar */}
      <SearchFilter events={filteredEvents} setFilteredEvents={setFilteredEvents} />


      <div className="events-content">
        {activeTab === "myEvents" ? (
          <MyEvents events={filteredEvents} />
        ) : (
          <AllEvents events={filteredEvents} />
        )}
      </div>
    </div>
  );
};

export default Events;
