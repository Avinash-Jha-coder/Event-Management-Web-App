import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "./Navbar.css";
export default function Navbar({ isOpen, onClose }) {
  const { user, logout, loading } = useContext(AuthContext);
  const defaultProfile = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  if (loading) return null; // avoid flicker during fetch

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>✖</button>

      <div className="profile-section">
        <img
          src={user?.profilePic || defaultProfile}
          alt="Profile"
          style={{ width: "40px", borderRadius: "50%" }}
        />
        <nav>
          {user ? (
            <>
              <span>Hello, {user.name}</span>
              
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>

      <ul>
        <li><Link to="/" onClick={onClose}>Home</Link></li>
        <li><Link to="/events" onClick={onClose}>Events</Link></li>
        <li><Link to="/profile" onClick={onClose}>My Profile</Link></li>
        <li><Link to="/settings" onClick={onClose}>Settings</Link></li>
        <li><Link to="/calendar" onClick={onClose}>Calendar</Link></li>
        <li><Link to="/bookmark" onClick={onClose}>Bookmark</Link></li>
      </ul>

    <button onClick={logout}>Logout</button>
    </div>
  );
}
