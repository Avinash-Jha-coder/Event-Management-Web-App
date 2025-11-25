import React, { useState, useEffect } from "react";
import "./Home.css";
import { BrowserRouter as Router, Routes, Route, useParams, Link, useNavigate } from "react-router-dom";
import events from "../components/Events";
import Navbar from "../components/Navbar";
import EventDetail from "../context/EventDetail";
import Login from "./Login";
import Signup from "./SignUp";
import Profile from "./Profile";
import CreateEvent from "./createEvent";
import EventsList from "./EventList";

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [dark, setDark] = useState(false);
  const [activeTab, setActiveTab] = useState("explore");
  const [isOpen, setIsOpen] = useState(false);

  const [showPopup, setShowPopup] = useState(true);
  const [activeForm, setActiveForm] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setShowPopup(true);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          console.log(" User authenticated:", data);
          setShowPopup(false);
        } else {
          localStorage.removeItem("token");
          setShowPopup(true);
        }
      } catch (err) {
        console.error(" Auth check failed:", err);
        localStorage.removeItem("token");
        setShowPopup(true);
      }
    };

    checkAuth();
  }, []);


  const handleLogin = async (form) => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(" Login response:", data);

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        setShowPopup(false);
        setActiveForm(null);
        navigate("/");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error(" Login error:", err);
      alert("Internal server error");
    }
  };

  // Search + Filter
  const filteredEvents = events.filter(
    (event) =>
      (filter === "all" || event.category === filter) &&
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={dark ? "App dark" : "App"}>
      {isOpen && <Navbar isOpen={isOpen} onClose={() => setIsOpen(false)} />}

      <div className="header">
        <div className="top-bar">
          <span className="menu-btn" onClick={() => setIsOpen(true)}>
            <i className="fa-solid fa-bars" />
          </span>
          <div className="location">
            <label className="location-label">Current Location</label>
            <select>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
              <option>China</option>
              <option>Canada</option>
              <option>Germany</option>
              <option>France</option>
              <option>Argentina</option>
              <option>Luxembourg</option>
              <option>Brazil</option>
              <option>Russia</option>
            </select>
          </div>
          <span>
            <i className="fa-solid fa-bell" />
          </span>
        </div>

        {/* Search */}
        <div className="search-bar">
          <i className="fa-solid fa-magnifying-glass" />
          <input
            type="text"
            placeholder="Search for Events"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="filter-btn">
            <i className="fa-solid fa-filter" />
          </button>
        </div>

        {/* Categories */}
        <div className="categories-slider">
          <button className="cat sport" onClick={() => setFilter("sports")}>
            Sports
          </button>
          <button className="cat music" onClick={() => setFilter("music")}>
            Music
          </button>
          <button className="cat food" onClick={() => setFilter("food")}>
            Food
          </button>
          <button className="cat all" onClick={() => setFilter("all")}>
            All
          </button>
        </div>
      </div>

      <div className="section-header">
        <span>Upcoming Events</span>
        <a href="/all-events">See All ➜</a>
      </div>

      <div className="cards-slider">
        {filteredEvents.map((event) => (
          <div className="card" key={event.id}>
            <img src={event.image} alt={event.title} />
            <div className="date">{event.date}</div>
            <h4>{event.title}</h4>
            <p className="attendees">{event.attendees}</p>
            <p className="location">{event.location}</p>
            <Link to={`/event/${event.id}`}>View Details ➜</Link>
          </div>
        ))}
      </div>

      <div className="invite-card">
        <strong>Invite your friends</strong>
        <p>Get $5 for ticket</p>
        <button>INVITE</button>
      </div>

      {/* Dark Mode Toggle */}
      <div className="toggle-container">
        <button onClick={() => setDark(!dark)}>
          {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Popup only if no valid token */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            {!activeForm && (
              <>
                <h2>Welcome 👋</h2>
                <p>Please login or register to continue.</p>
                <div className="popup-buttons">
                  <button onClick={() => setActiveForm("login")}>Login</button>
                  <button onClick={() => setActiveForm("signup")}>Register</button>
                  <button onClick={() => setShowPopup(false)}>Do Later</button>
                </div>
              </>
            )}

            {activeForm === "login" && (
              <div className="popup-form">
                <Login onLoginSuccess={() => {
            setShowPopup(false);
            setActiveForm(null);
          }} />
                <button onClick={() => setActiveForm(null)}>⬅ Back</button>
              </div>
            )}

            {activeForm === "signup" && (
              <div className="popup-form">
                <Signup />
                <button onClick={() => setActiveForm(null)}>⬅ Back</button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="footer">

  {/* EXPLORE */}
  <div
    className={activeTab === "explore" ? "active" : ""}
    onClick={() => setActiveTab("explore")}
  >
    <i className="fa-solid fa-compass" />
    <p>Explore</p>
  </div>

  {/* EVENTS */}
  <div
    className={activeTab === "EventList" ? "active" : ""}
    onClick={() => setActiveTab("EventList")}
  >
    <i className="fa-solid fa-calendar" />
    <p>Events</p>
  </div>

  {/* CREATE EVENT — LOGIN PROTECTED */}
  <div
    className={activeTab === "createEvent" ? "active" : ""}
    onClick={() => {
      const token = localStorage.getItem("token");
      if (!token) {
        setShowPopup(true);
        setActiveForm("login");
      } else {
        setActiveTab("createEvent");
        navigate("/createEvent");
      }
    }}
  >
    <i className="fa-solid fa-plus" />
  </div>

  {/* MAP */}
  <div
    className={activeTab === "map" ? "active" : ""}
    onClick={() => setActiveTab("map")}
  >
    <i className="fa-solid fa-location-dot" />
    <p>Map</p>
  </div>

  {/* PROFILE — LOGIN PROTECTED */}
  <div
    className={activeTab === "Profile" ? "active" : ""}
    onClick={() => {
      const token = localStorage.getItem("token");
      if (!token) {
        setShowPopup(true);
        setActiveForm("login");
      } else {
        setActiveTab("Profile");
        navigate("/profile");
      }
    }}
  >
    <i className="fa-solid fa-user" />
    <p>Profile</p>
  </div>

</footer>

    </div>
  );
}
