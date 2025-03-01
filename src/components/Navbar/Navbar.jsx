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
      </div>

      <div className="authButtons">
      <button
          className="nav-button1"
          data-testid="UserSignUp_Button"
          onClick={() => navigate("/UserLogin", { state: { isSignUp: true } })}
        >
          Register
        </button>

        <button
          className="nav-button2"
          data-testid="UserLogin_Button"
          onClick={() => navigate("/UserLogin", { state: { isSignUp: false } })}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
