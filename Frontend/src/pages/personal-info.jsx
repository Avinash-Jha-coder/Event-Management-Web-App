import React, { useEffect, useState } from "react";
import "./personal-info.css";

export default function PersonalInfo() {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.log("Profile fetch fail", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const form = new FormData();
    form.append("name", user.name);
    form.append("email", user.email);
    if (image) form.append("image", image);

    const res = await fetch("http://localhost:5000/update-profile", {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });

    const data = await res.json();
    alert(data.message);
    setEditMode(false);
    fetchProfile();
  };

  return (
    <div className="profile-container">
      <h2>Personal Information</h2>

      <div className="profile-card">
        <div className="profile-image">
          {user.image ? (
            <img src={`http://localhost:5000/uploads/${user.image}`} alt="profile" />
          ) : (
            <div className="placeholder">{user?.name?.charAt(0)}</div>
          )}
        </div>

        {!editMode ? (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <button className="edit-btn" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          </>
        ) : (
          <form className="edit-form" onSubmit={handleUpdate}>
            <label>Name</label>
            <input
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />

            <label>Email</label>
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <label>Upload New Image</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />

            <button type="submit" className="save-btn">Save Changes</button>
            <button className="cancel-btn" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
