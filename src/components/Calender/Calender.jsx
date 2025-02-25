import { useEffect, useState } from "react";
import "./Calender.css";

const Calender = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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

  // Calculate days in the selected month and the weekday of the first day
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const startDay = new Date(selectedYear, selectedMonth, 1).getDay();

  // Build calendar cells
  let calendarCells = [];
  // Add empty cells for days before the first of the month
  for (let i = 0; i < startDay; i++) {
    calendarCells.push(null);
  }
  // Add actual day numbers
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  // Group cells into weeks (arrays of 7)
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
                  <td key={cellIndex}>{cell ? cell : ""}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calender;
