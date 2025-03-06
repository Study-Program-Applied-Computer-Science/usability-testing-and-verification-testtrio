import React, { useState } from "react";
import MyEvents from "./myEvents/MyEvents.jsx"; 
import AllEvents from "./allEvents/AllEvents.jsx"; 

const Events = () => {
  const [activeTab, setActiveTab] = useState("myEvents");

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

      <div className="events-content">
        {activeTab === "myEvents" ? <MyEvents /> : <AllEvents />}
      </div>
    </div>
  );
};

export default Events;
