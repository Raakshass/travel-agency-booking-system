const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    availableDates: [{ type: String, required: true }],
    image: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Package", packageSchema);
