import { useEffect, useState } from "react";
import "./Calender.css";

const Calender = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

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

  return (
    <div className="calender-container">
      <div className="calender-header">
        <h2>Calendar</h2>
        <div className="time-icon">{timeIcon}</div>
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
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
            </tr>
            <tr>
              <td>8</td>
              <td>9</td>
              <td>10</td>
              <td>11</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
            </tr>
            <tr>
              <td>15</td>
              <td>16</td>
              <td>17</td>
              <td>18</td>
              <td>19</td>
              <td>20</td>
              <td>21</td>
            </tr>
            <tr>
              <td>22</td>
              <td>23</td>
              <td>24</td>
              <td>25</td>
              <td>26</td>
              <td>27</td>
              <td>28</td>
            </tr>
            <tr>
              <td>29</td>
              <td>30</td>
              <td>31</td>
              <td colSpan="4"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calender;
