import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import "./personal-info"

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-pic">
          
        </div>
        <h2 className="profile-name">Avinash</h2>

        <div
          className="profile-option"
          onClick={() => navigate("/personal-info")}
        >
          <span>Personal Information</span>
          <span className="arrow">›</span>
        </div>

        <div
          className="profile-option"
          onClick={() => navigate("/manage-events")}
        >
          <span>Manage Events</span>
          <span className="arrow">›</span>
        </div>

        <div
          className="profile-option"
          onClick={() => navigate("/bookings")}
        >
          <span>My Bookings</span>
          <span className="arrow">›</span>
        </div>

        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
}
