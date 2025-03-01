import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

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
        <button
          className="nav-button"
          data-testid="UserLogin_Button"
          onClick={() => navigate("/UserLogin")}
        >
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
