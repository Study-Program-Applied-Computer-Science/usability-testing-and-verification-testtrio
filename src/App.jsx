import './App.css';
import { Routes, Route, NavLink } from "react-router-dom";

import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Calender from "./components/Calender/Calender.jsx";
import UserLogin from "./components/UserLogin/UserLogin.jsx";

const App = () => {
  return (
    <div data-testid="App" className="App">
      <nav data-testid="main_nav">
        <h1 data-testid="brandName">Schedule My Event</h1>
        <div className="nav-links">
          <NavLink data-testid="Home_Link" to="/" end>
            Home
          </NavLink>
          <NavLink data-testid="About_Link" to="/about">
            About
          </NavLink>
          <NavLink data-testid="UserLogin_Link" to="/UserLogin">
            UserLogin
          </NavLink>
          <NavLink data-testid="Calender_Link" to="/calender">
            Calender
          </NavLink>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Calender" element={<Calender />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        {/* Wildcard route */}
        <Route path="*" element={<h4 className="error">Route Not Found</h4>} />
      </Routes>
    </div>
  );
};

export default App;
