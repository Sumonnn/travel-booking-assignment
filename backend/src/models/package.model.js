const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Package title is required"],
            trim: true,
        },

        destination: {
            type: String,
            required: [true, "Destination is required"],
            trim: true,
            lowercase: true,
        },

        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"],
        },

        duration: {
            type: String,
            required: [true, "Duration is required"],
            trim: true,
        },

        availableSeats: {
            type: Number,
            required: [true, "Available seats is required"],
            min: [0, "Available seats cannot be negative"],
        },

        startDate: {
            type: Date,
            required: [true, "Start date is required"],
        },

        image: {
            type: String,
            required: [true, "Image is required"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;