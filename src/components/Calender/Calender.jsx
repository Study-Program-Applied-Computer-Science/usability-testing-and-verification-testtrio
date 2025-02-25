import { useEffect, useState } from "react";
import "./Calender.css";

const Calender = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const currentHour = currentTime.getHours();
  // Determine whether it's daytime or nighttime.
  // For this example, daytime is between 6am and 6pm.
  const isDaytime = currentHour >= 6 && currentHour < 18;
  const timeIcon = isDaytime ? "Good Morning ☀️" : "Good Night 🌙";

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Calculate days in selected month and the weekday of the first day
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const startDay = new Date(selectedYear, selectedMonth, 1).getDay();

  // Build calendar cells
  let calendarCells = [];
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startDay; i++) {
    calendarCells.push(null);
  }
  // Add actual day numbers
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  // Group cells into weeks (rows of 7)
  const weeks = [];
  for (let i = 0; i < calendarCells.length; i += 7) {
    weeks.push(calendarCells.slice(i, i + 7));
  }

  // Generate a range of years for the filter (currentYear - 10 to currentYear + 10)
  const currentYearVal = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYearVal - 10; year <= currentYearVal + 10; year++) {
    yearOptions.push(year);
  }

  // Handle clicking on a valid day cell
  const handleDayClick = (day) => {
    if (day) {
      setSelectedDay(day);
      setShowModal(true);
    }
  };

  // Handle form submission for scheduling event
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the event details (for example, log or save them)
    console.log("Event Scheduled:", {
      date: `${monthNames[selectedMonth]} ${selectedDay}, ${selectedYear}`,
      title: eventTitle,
      description: eventDescription,
    });
    // Reset and close the modal
    setEventTitle("");
    setEventDescription("");
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="calender-container">
      <div className="calender-header">
        <h2>Calendar</h2>
        <div className="time-icon">{timeIcon}</div>
      </div>

      {/* Month and Year Filter */}
      <div className="filter-container">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {monthNames.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Calendar Table */}
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
                {week.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    onClick={() => handleDayClick(cell)}
                    className={cell ? "clickable" : ""}
                  >
                    {cell ? cell : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Popup for Scheduling Event */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>
              Schedule Event on {monthNames[selectedMonth]} {selectedDay}, {selectedYear}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Event Title:</label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Event Description:</label>
                <textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calender;
