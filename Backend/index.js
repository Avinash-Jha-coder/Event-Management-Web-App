const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');   // add bcrypt
const jwt = require('jsonwebtoken');  // add jwt
require('dotenv').config();

const userModel = require('./models/userModel'); // make sure userModel import ho raha hai

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET ;

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Signup Route
app.post('/create', async (req, res) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create the user with the hashed password
        const Createduser = await userModel.create({
            ...req.body,
            password: hashedPassword,
        });

        res.send(Createduser);
        console.log("User Account created:", Createduser);
    } catch (err) {
        res.status(400).send({ error: "Error creating user" });
    }
});

const authMiddleware = require("./middleware/authMiddleware");

app.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error fetching profile" });
  }
});

// Login Route with JWT
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.send({
            message: "Login successful",
            token,
            user: { id: user._id, email: user.email, name: user.name }
        });

    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Internal server error" });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
