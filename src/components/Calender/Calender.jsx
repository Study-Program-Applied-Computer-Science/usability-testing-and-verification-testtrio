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
  const events = useSelector((state) => state.events || []);

  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState({ date: "", time: "" });
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]);

  const handleDateClick = (info) => {
    const selectedDate = info.dateStr.split("T")[0];
    const selectedTime = info.dateStr.includes("T") 
      ? info.dateStr.split("T")[1].slice(0, 5) 
      : "00:00"; 

    setSelectedDateTime({ date: selectedDate, time: selectedTime });
    setEditingEvent(null);
    setShowEventForm(true);
  };

  const handleEventClick = (clickInfo) => {
    const eventStart = new Date(clickInfo.event.startStr);
    const eventTime = eventStart.toTimeString().slice(0, 5); 
  
    setEditingEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.startStr, 
      time: eventTime,
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
        initialView="timeGridWeek"
        headerToolbar={{
          left: "today prev,next",
          center: "title",
          right: "timeGridDay,timeGridWeek,dayGridMonth",
        }}
        selectable={true}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
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
          editingEvent={editingEvent}
        />
      )}
    </div>
  );
};

export default CalendarView;
