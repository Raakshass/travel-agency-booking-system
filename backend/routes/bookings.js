const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// POST: Create a new booking
router.post("/", async (req, res) => {
    try {
        const { name, email, phone, travelers, requests, packageId, totalPrice } = req.body;

        if (!name || !email || !phone || !travelers || !packageId || !totalPrice) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newBooking = new Booking({
            name,
            email,
            phone,
            travelers,
            requests,
            packageId,
            totalPrice,
        });

        await newBooking.save();
        res.status(201).json({ message: "Booking created successfully", booking: newBooking });
    } catch (err) {
        res.status(500).json({ message: "Failed to create booking", error: err.message });
    }
});

// GET: Fetch all bookings with package details populated
router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find().populate("packageId", "title price description");
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
    }
});

module.exports = router;
