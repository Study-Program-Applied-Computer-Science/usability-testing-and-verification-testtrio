import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadEvents } from "../../redux/store";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CreateEvent from "./CreateEvent";
import "./Calendar.css";

const CalendarView = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState({ date: "", time: "" });
  const [editingEvent, setEditingEvent] = useState(null); // Track editing event

  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]);

  const handleDateClick = (info) => {
    const selectedDate = info.dateStr.split("T")[0];
    const selectedTime = info.dateStr.includes("T") 
      ? info.dateStr.split("T")[1].slice(0, 5) 
      : "00:00"; //  Extract time or default to 00:00
  
    setSelectedDateTime({ date: selectedDate, time: selectedTime });
    setEditingEvent(null); //  Reset to create mode
    setShowEventForm(true);
  };
  

  const handleEventClick = (clickInfo) => {
    const eventStart = new Date(clickInfo.event.startStr);
    const eventTime = eventStart.toTimeString().slice(0, 5); //  Extracts HH:MM format
  
    setEditingEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.startStr, 
      time: eventTime, //  Set correct time
      description: clickInfo.event.extendedProps.description || "",
      attendees: clickInfo.event.extendedProps.attendees || "",
      createdBy: clickInfo.event.extendedProps.createdBy,
    });
  
    setShowEventForm(true);
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
        eventClick={handleEventClick} //  Handle event click
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
          editingEvent={editingEvent} //  Pass selected event for editing
        />
      )}
    </div>
  );
};

export default CalendarView;
