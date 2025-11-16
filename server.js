const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URL, PORT } = require("./config.js");

const authRoutes = require("./routes/authRoutes.js");
const eventRoutes = require("./routes/eventRoutes.js");
const bookingRoutes = require("./routes/bookingRoutes.js");

const app = express();
app.use(express.json());

mongoose.connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/bookings", bookingRoutes);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
