const express = require("express");
const router = express.Router();
const Package = require("../models/Package");

// GET all tour packages with search, filter, pagination, and sorting
router.get("/", async (req, res) => {
    try {
        const { title, minPrice, maxPrice, sort, page = 1, limit = 5 } = req.query;

        const filter = {};

        // Search by title (case-insensitive)
        if (title) {
            filter.title = { $regex: title, $options: "i" };
        }

        // Filter by price range, safely parse values
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice && !isNaN(minPrice)) filter.price.$gte = parseInt(minPrice);
            if (maxPrice && !isNaN(maxPrice)) filter.price.$lte = parseInt(maxPrice);
        }

        // Sorting options
        const sortOptions = {};
        if (sort === "priceAsc") sortOptions.price = 1;
        else if (sort === "priceDesc") sortOptions.price = -1;
        else if (sort === "titleAsc") sortOptions.title = 1;
        else if (sort === "titleDesc") sortOptions.title = -1;

        // Pagination setup
        const skip = (page - 1) * limit;

        // Fetch the filtered, sorted, and paginated packages
        const packages = await Package.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Package.countDocuments(filter);

        res.status(200).json({
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit),
            data: packages,
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching packages", error: err.message });
    }
});

// GET a single package by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const tourPackage = await Package.findById(id);
        if (!tourPackage) {
            return res.status(404).json({ message: "Package not found" });
        }
        res.status(200).json(tourPackage);
    } catch (err) {
        res.status(500).json({ message: "Error fetching package details", error: err.message });
    }
});

module.exports = router;
