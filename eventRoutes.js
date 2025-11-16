const express = require("express");
const Event = require("../models/Event.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

// Create Event (Admin Only)
router.post("/", auth("admin"), async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json(event);
});

// Get All Events
router.get("/", async (req, res) => {
  res.json(await Event.find());
});

// Get Single Event
router.get("/:id", async (req, res) => {
  res.json(await Event.findById(req.params.id));
});

// Update Event (Admin Only)
router.put("/:id", auth("admin"), async (req, res) => {
  res.json(await Event.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

// Delete Event (Admin Only)
router.delete("/:id", auth("admin"), async (req, res) => {
  res.json(await Event.findByIdAndDelete(req.params.id));
});

module.exports = router;
