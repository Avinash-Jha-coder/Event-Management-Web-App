import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Events from "./Events";
import Navbar from "./Navbar";
import EventDetail from "../context/EventDetail";
import Profile from "../pages/Profile";  
import CreateEvent from "../pages/createEvent";
import PersonalInfo from "../pages/personal-info";
import EventsList from "../pages/EventList";

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/profile" element={<Profile />} />  
        <Route path="/createEvent" element={<CreateEvent />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
        <Route path="/all-events" element={<EventsList />} />

      </Routes>
    </>
  );
}
