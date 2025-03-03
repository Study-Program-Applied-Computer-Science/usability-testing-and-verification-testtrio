import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"; 
import interactionPlugin from "@fullcalendar/interaction";
import CreateEvent from "./CreateEvent";
import "./Calendar.css";

const CalendarView = () => {
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState({ date: "", time: "" });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const handleDateClick = (info) => {
    const date = info.dateStr.split("T")[0]; 
    const time = info.dateStr.includes("T") ? info.dateStr.split("T")[1].slice(0, 5) : "00:00";
    
    setSelectedDateTime({ date, time });
    setShowEventForm(true);
  };

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, newEvent];
      localStorage.setItem("events", JSON.stringify(updatedEvents)); 
      return updatedEvents;
    });
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth" 
        headerToolbar={{
          left: "today,prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        selectable={true}
        dateClick={handleDateClick}
        events={events} 
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          hour12: true, 
        }}
      />

    
      {showEventForm && (
        <CreateEvent
          isOpen={showEventForm}
          onClose={() => setShowEventForm(false)}
          selectedDateTime={selectedDateTime}
          addEvent={addEvent} 
        />
      )}
    </div>
  );
};

export default CalendarView;
