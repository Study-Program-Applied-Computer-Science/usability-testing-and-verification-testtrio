import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar-container" data-testid="main_nav">
      <h1 className="navbar-brand" data-testid="brandName">PlanD</h1>
      <div className="nav-links">
        <NavLink data-testid="Home_Link" to="/" end>
          Home
        </NavLink>
        <NavLink data-testid="Calender_Link" to="/calender">
          Create Plan
        </NavLink>
      </div>

      <div className="auth-buttons">
        <button
          className="nav-button1"
          data-testid="UserSignUp_Button"
          onClick={() => navigate("/UserLogin", { state: { isSignUp: true } })}
        >
          Sign Up
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