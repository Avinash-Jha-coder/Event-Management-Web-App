import React, { useState } from "react";
import "./Auth.css";
import './Login.jsx';
export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", number: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          number: form.number,
        }),
      });
      if (res.ok) {
        setMessage("Account created successfully!");
      } else {
        setMessage("Error creating account.");
      }
    } catch (err) {
      setMessage(" outside Error creating account.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="number" placeholder="Phone Number (optional)" onChange={handleChange} />
        <button type="submit">Create Account</button>
      </form>
      {message && <p>{message}</p>}
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}