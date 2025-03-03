import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Footer from "../Footer/Footer";
import "./Auth.css";

const API_URL = "http://localhost:3001/users";

const UserLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSignUp, setIsSignUp] = useState(location.state?.isSignUp || false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); 

  useEffect(() => {
    if (location.state?.isSignUp !== undefined) {
      setIsSignUp(location.state.isSignUp);
    }
  }, [location.state]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/UserLogin"); // Redirect to login if logged out
    }
  }, [isLoggedIn, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch users");
  
      const data = await response.json();
      const users = data.users ? data.users : data;
      console.log("Fetched Users:", users);
  
      if (isSignUp) {
        if (users.some((user) => user.email.toLowerCase() === formData.email.toLowerCase())) {
          alert("Email is already registered! Please log in.");
          navigate("/UserLogin", { state: { isSignUp: false } });
          return;
        }
  
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        alert("Sign Up Successful! Please Log In.");
        setFormData({ username: "", email: "", password: "" });
        setIsSignUp(false);
        navigate("/UserLogin", { state: { isSignUp: false } });
  
      } else {
        if (!formData.username.trim() || !formData.password.trim()) {
          alert("Please enter both username and password.");
          return;
        }
  
        const user = users.find((u) =>
          u.username.toLowerCase().trim() === formData.username.toLowerCase().trim() &&
          u.password.trim() === formData.password.trim()
        );
  
        if (user) {
          alert("Login Successful!");
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          setIsLoggedIn(true);
          navigate("/"); // Redirect to home
          window.location.reload(); // ✅ Force reload to update Navbar immediately
        } else {
          alert("Invalid username or password!");
        }
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("An error occurred while processing your request.");
    }
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    navigate("/UserLogin", { replace: true });
    window.location.reload(); // ✅ Force reload to update UI immediately
  };
  

  return (
    <div className="auth-container">
      <div className="auth-left">
        <img src="src\Assets\login.svg" alt="Login Illustration" />
        <div className="notification">📅 Meeting at 10 AM</div>
        <div className="notification" style={{ top: "20%", right: "10%" }}>⏰ Task Reminder</div>
        <div className="notification" style={{ top: "30%", right: "15%" }}>🔔 New Event Added</div>
      </div>


      <div className="auth-right">
        <div className="auth-box">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "orange",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
              {isSignUp && (
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              )}
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>


              <button onClick={handleAuth}>{isSignUp ? "Sign Up" : "Sign In"}</button>
              <p onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </p>
            </>
          )}
        </div>
      </div>
      <footer />
    </div>
    
  );
};

export default UserLogin;
