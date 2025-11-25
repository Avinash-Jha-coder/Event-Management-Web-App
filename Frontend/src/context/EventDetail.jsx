import React from "react";
import { useParams } from "react-router-dom";
import events from "../components/Events";
import "./EventDetail.css";
export default function EventDetail() {
  const { id } = useParams();
  const event = events.find(e => e.id === parseInt(id));

  if (!event) {
    return <h2>Event not found</h2>;
  }

  return (
       <div className="event-details-container">
        {/* Big Event Image */}
        <img
          src={event.image}
          alt={event.title}
          className="event-image"
        />

        <h2 className="event-title">{event.title}</h2>

        <div className="event-info">
          <p>
            <strong>Date:</strong> {event.date}
          </p>
          <p>
            <strong>Location:</strong>  {event.location}
          </p>
          <p>
            <strong>Attendees:</strong> {event.attendees} Going
          </p>
        </div>

        <p className="event-description">
          {event.description}
        </p>

        {/* Book Now Button */}
        <button className="book-btn">Book Now</button>
    </div>
  );
}
