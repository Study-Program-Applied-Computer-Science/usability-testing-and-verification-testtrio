import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Auth.css";

const UserLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  useEffect(() => {
    if (location.state && location.state.isSignUp !== undefined) {
      setIsSignUp(location.state.isSignUp);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    const url = isSignUp ? "/api/users" : "/api/login";
    const method = "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(`/api/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
       <img src="/assets/login.svg" alt="Login Illustration" />
      </div>
      <div className="auth-right">
        <div className="auth-box">
          {forgotPassword ? (
            <>
              <h2>Reset Password</h2>
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
              <button onClick={handleForgotPassword}>Reset Password</button>
              <button onClick={() => setForgotPassword(false)}>Back</button>
            </>
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
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button onClick={handleAuth}>{isSignUp ? "Sign Up" : "Sign In"}</button>
              <p onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </p>
              <p onClick={() => setForgotPassword(true)}>Forgot Password?</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
