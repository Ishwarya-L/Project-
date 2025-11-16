const express = require("express");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { name, email, role } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  const user = new User({ name, email: hashedPass, role });
  await user.save();
  res.json({ message: "User registered" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(403).json({ error: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

module.exports = router;
