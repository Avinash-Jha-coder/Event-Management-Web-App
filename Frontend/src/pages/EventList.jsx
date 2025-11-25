import React from "react";
import { Link } from "react-router-dom";
import events from "../components/Events";
import "./Eventlist.css"

export default function EventsList() {
  return (
    <div className="events-list-page">
      <header className="events-header">
        <Link to="/" className="back-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <h2>Events</h2>
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
      </header>

      <div className="events-container">
        {events.map((event) => (
          <Link to={`/event/${event.id}`} className="event-row" key={event.id}>
            <img src={event.image} alt="" className="event-img" />

            <div className="event-info">
              <p className="event-date">{event.date}</p>
              <h3 className="event-title">{event.title}</h3>

              <p className="event-location">
                <i className="fa-solid fa-location-dot"></i>
                {event.location}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
