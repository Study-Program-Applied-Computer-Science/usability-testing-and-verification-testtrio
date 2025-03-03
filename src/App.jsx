import './App.css';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./components/Home/Home.jsx";
import Calender from "./components/Calender/Calender.jsx";
import UserLogin from "./components/UserLogin/UserLogin.jsx";

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  // Update login state when localStorage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")) || false);
    };

    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  // Ensure user is redirected on login/logout change
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/UserLogin", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <div data-testid="App" className="App">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/UserLogin" replace />} />
        <Route path="/Calender" element={isLoggedIn ? <Calender /> : <Navigate to="/UserLogin" replace />} />
        <Route path="/UserLogin" element={<UserLogin setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
};

export default App;
