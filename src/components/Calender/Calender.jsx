import { useEffect, useState } from "react";
import EventForm from "./EventForm";
import "./Calender.css";

const Calender = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [events, setEvents] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const currentHour = currentTime.getHours();
  const isDaytime = currentHour >= 6 && currentHour < 18;
  const timeIcon = isDaytime ? "Good Morning ☀️" : "Good Night 🌙";

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const startDay = new Date(selectedYear, selectedMonth, 1).getDay();

  let calendarCells = [];
  for (let i = 0; i < startDay; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  const weeks = [];
  for (let i = 0; i < calendarCells.length; i += 7) {
    weeks.push(calendarCells.slice(i, i + 7));
  }

  const currentYearVal = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYearVal - 10; year <= currentYearVal + 10; year++) {
    yearOptions.push(year);
  }

  const handleDayClick = (day) => {
    if (!day) return;
    setSelectedDay(day);
    setShowModal(true);
  };

  const handleSaveEvent = (eventData) => {
    const eventKey = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    setEvents((prev) => ({
      ...prev,
      [eventKey]: eventData,
    }));
    setShowModal(false);
  };

  return (
    <div className="calender-container">
      <div className="calender-header">
        <h2>Calendar</h2>
        <div className="time-icon">{timeIcon}</div>
      </div>

      <div className="filter-container">
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
          {monthNames.map((month, index) => (
            <option key={month} value={index}>{month}</option>
          ))}
        </select>
        <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
          {yearOptions.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="calender-body">
        <table className="calendar-table">
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((cell, cellIndex) => {
                  const eventKey = `${selectedYear}-${selectedMonth}-${cell}`;
                  return (
                    <td key={cellIndex} onClick={() => handleDayClick(cell)} className={cell ? "clickable" : ""}>
                      {cell}
                      {events[eventKey] && (
                        <div className="event-tag">
                          {events[eventKey].title} ({events[eventKey].time})
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <EventForm
          selectedDate={{ month: monthNames[selectedMonth], day: selectedDay, year: selectedYear }}
          event={events[`${selectedYear}-${selectedMonth}-${selectedDay}`]}
          onSave={handleSaveEvent}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Calender;
