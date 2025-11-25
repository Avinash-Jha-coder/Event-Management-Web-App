const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

app.post("/create-event", upload.single("image"), async (req, res) => {
  try {
    const event = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      date: req.body.date,
      location: req.body.location,
      image: req.file.filename,
    };

    // save event to DB

    res.json({ message: "Event created!", event });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});
app.put("/update-profile", upload.single("image"), async (req, res) => {
  try {
    const { name, email } = req.body;

    const updated = {
      name,
      email,
      image: req.file ? req.file.filename : undefined,
    };

    // Update in DB
    await User.findByIdAndUpdate(req.user.id, updated);

    res.json({ message: "Profile updated successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});


// GET ALL EVENTS
router.get("/", async (req, res) => {
  const events = await Event.find().populate("organizer", "name email");
  res.json(events);
});

// UPDATE EVENT (ONLY ORGANIZER)
router.put("/:id", auth, async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) return res.status(404).json({ error: "Event not found" });

  if (event.organizer.toString() !== req.user.id)
    return res.status(403).json({ error: "You cannot edit this event" });

  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  res.json(updated);
});

module.exports = router;
