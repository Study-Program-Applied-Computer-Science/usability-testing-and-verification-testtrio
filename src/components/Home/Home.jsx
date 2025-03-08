import React from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <div className="content">
          <div className="illustration">
            <img src="src\Assets\Home page picture.png" alt="Calendar Illustration" className="illustration-img" />
          </div>
          <div className="text-content">
            <h1 className="title">Personal Event Schedule App!</h1>
            <h2 className="description">
              Stay organized effortlessly with the Personal Event Schedule App! Plan, track, and manage your events in an intuitive calendar view,
              complete with smart scheduling, email notifications, and seamless event editing all in a user-friendly interface.
              <div className="buttons">
              <button
                className="btn-primary"
                onClick={() => navigate("/Calender", { state: { isSignUp: true } })}
              >
                Get Started
              </button>
              <button
                className="btn-secondary"
                onClick={() => navigate("/Events", { state: { isSignUp: true } })}
              >
                Access Now
              </button>
            </div>
            </h2>            
          </div>
        </div>
      </div>
      < Footer / >
    </div>
  );
};

export default Home;
