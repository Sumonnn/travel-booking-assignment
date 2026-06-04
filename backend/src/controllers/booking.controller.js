const mongoose = require("mongoose");
const Package = require("../models/package.model");
const Booking = require("../models/booking.model");

const createBooking = async (req, res) => {
    try {
        const { customerName, email, seats, packageId } = req.body;

        if (!customerName || !email || seats === undefined || !packageId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(packageId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid package ID",
            });
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email",
            });
        }

        const seatsNumber = Number(seats);

        if (!Number.isInteger(seatsNumber) || seatsNumber <= 0) {
            return res.status(400).json({
                success: false,
                message: "Seats must be greater than 0",
            });
        }

        const travelPackage = await Package.findById(packageId);

        if (!travelPackage) {
            return res.status(404).json({
                success: false,
                message: "Package not found",
            });
        }

        if (seatsNumber > travelPackage.availableSeats) {
            return res.status(400).json({
                success: false,
                message: `Only ${travelPackage.availableSeats} seats are available`,
            });
        }

        const booking = await Booking.create({
            customerName,
            email,
            seats: seatsNumber,
            packageId,
        });

        travelPackage.availableSeats = travelPackage.availableSeats - seatsNumber;
        await travelPackage.save();

        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: {
                booking,
                remainingSeats: travelPackage.availableSeats,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to create booking",
        });
    }
};

module.exports = {
    createBooking,
};