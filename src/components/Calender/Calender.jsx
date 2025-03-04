import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadEvents, addEvent } from "../../redux/store"; // Import Redux actions
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CreateEvent from "./CreateEvent";
import "./Calendar.css";

const CalendarView = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events); // Get events from Redux state
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState({ date: "", time: "" });

  // Load events from JSON Server when the component mounts
  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]);

  const handleDateClick = (info) => {
    const date = info.dateStr.split("T")[0];
    const time = info.dateStr.includes("T") ? info.dateStr.split("T")[1].slice(0, 5) : "00:00";

    setSelectedDateTime({ date, time });
    setShowEventForm(true);
  };

  const addNewEvent = (newEvent) => {
    dispatch(addEvent(newEvent)); // Saves event to Redux & JSON Server
    setShowEventForm(false);
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
        events={events} // Load events from Redux store
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
          addEvent={addNewEvent} // Uses Redux instead of local state
        />
      )}
    </div>
  );
};

export default CalendarView;
