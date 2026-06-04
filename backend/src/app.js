const express = require("express");
const cors = require("cors");

const packageRoutes = require("./routes/package.routes");
const bookingRoutes = require("./routes/booking.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Travel Booking API is running",
    });
});

app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found",
    });
});

module.exports = app;