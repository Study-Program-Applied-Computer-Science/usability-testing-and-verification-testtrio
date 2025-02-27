import { NavLink } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <nav data-testid="main_nav">
      <h1 data-testid="brandName">EventPlanner</h1>
      <div className="nav-links">
        <NavLink data-testid="Home_Link" to="/" end>
          Home
        </NavLink>               
        <NavLink data-testid="Calender_Link" to="/calender">
          Create Event
        </NavLink>
        <NavLink data-testid="UserLogin_Link" to="/UserLogin">
          UserLogin
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
