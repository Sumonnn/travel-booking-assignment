const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: [true, "Customer name is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
        },

        seats: {
            type: Number,
            required: [true, "Seats is required"],
            min: [1, "Seats must be greater than 0"],
        },

        packageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Package",
            required: [true, "Package ID is required"],
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;