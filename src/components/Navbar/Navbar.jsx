import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import React from "react";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/UserLogin", { replace: true }); 
  };

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
        <NavLink data-testid="Events_Link" to="/Events">
          Events
        </NavLink>
      </div>

      <div className="auth-buttons">
        {isLoggedIn ? (
          <button
            className="logout-button"
            onClick={handleLogout}
            style={{ backgroundColor: "orange", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Logout
          </button>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
