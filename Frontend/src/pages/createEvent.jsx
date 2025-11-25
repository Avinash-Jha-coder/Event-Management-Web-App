import React, { useState } from "react";
import "./CreateEvent.css";

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    location: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return alert("Please login");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("date", form.date);
    formData.append("location", form.location);
    formData.append("image", image);

    const res = await fetch("http://localhost:5000/create-event", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="create-event-container">
      <h2>Create New Event</h2>

      <form className="event-form" onSubmit={handleSubmit}>
        
        <label>Event Title</label>
        <input type="text" name="title" onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" onChange={handleChange} required />

        <label>Category</label>
        <select name="category" onChange={handleChange}>
          <option>Music</option>
          <option>Sports</option>
          <option>Food</option>
          <option>Art</option>
        </select>

        <label>Date</label>
        <input type="date" name="date" onChange={handleChange} required />

        <label>Location</label>
        <input type="text" name="location" onChange={handleChange} required />

        <label>Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImage} required />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}
