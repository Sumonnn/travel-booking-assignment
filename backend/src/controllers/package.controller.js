const mongoose = require("mongoose");
const Package = require("../models/package.model");


const addPackage = async (req, res) => {
    try {
        const {
            title,
            destination,
            price,
            duration,
            availableSeats,
            startDate,
            image,
        } = req.body;

        if (
            !title ||
            !destination ||
            price === undefined ||
            !duration ||
            availableSeats === undefined ||
            !startDate ||
            !image
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (Number(price) < 0) {
            return res.status(400).json({
                success: false,
                message: "Price cannot be negative",
            });
        }

        if (Number(availableSeats) < 0) {
            return res.status(400).json({
                success: false,
                message: "Available seats cannot be negative",
            });
        }

        const travelPackage = await Package.create({
            title,
            destination,
            price,
            duration,
            availableSeats,
            startDate,
            image,
        });

        return res.status(201).json({
            success: true,
            message: "Package added successfully",
            data: travelPackage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to add package",
        });
    }
};

const getAllPackages = async (req, res) => {
    try {
        const { destination, sort, page = 1, limit = 6 } = req.query;

        const query = {};

        if (destination) {
            query.destination = {
                $regex: destination,
                $options: "i",
            };
        }

        let sortOption = { createdAt: -1 };

        if (sort === "price_asc") {
            sortOption = { price: 1 };
        }

        if (sort === "price_desc") {
            sortOption = { price: -1 };
        }

        const pageNumber = Math.max(Number(page), 1);
        const limitNumber = Math.max(Number(limit), 1);
        const skip = (pageNumber - 1) * limitNumber;

        const totalPackages = await Package.countDocuments(query);

        const packages = await Package.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limitNumber);

        const totalPages = Math.ceil(totalPackages / limitNumber);

        return res.status(200).json({
            success: true,
            message: "Packages fetched successfully",
            data: packages,
            pagination: {
                totalPackages,
                totalPages,
                currentPage: pageNumber,
                limit: limitNumber,
                hasNextPage: pageNumber < totalPages,
                hasPrevPage: pageNumber > 1,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch packages",
        });
    }
};

const getSinglePackage = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid package ID",
            });
        }

        const travelPackage = await Package.findById(id);

        if (!travelPackage) {
            return res.status(404).json({
                success: false,
                message: "Package not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Package details fetched successfully",
            data: travelPackage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch package details",
        });
    }
};

module.exports = {
    addPackage,
    getAllPackages,
    getSinglePackage,
};