const express = require("express");
const Booking = require("../models/Booking.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

// Book Event (User)
router.post("/", auth(), async (req, res) => {
  const booking = new Booking({ userId: req.user.id, eventId: req.body.eventId });
  await booking.save();
  res.json(booking);
});

// View Bookings (User)
router.get("/", auth(), async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id }).populate("eventId");
  res.json(bookings);
});

module.exports = router;
