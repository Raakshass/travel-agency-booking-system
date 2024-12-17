const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Package = require("./models/Package");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
        seedDatabase(); // Automatically seed the database
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    });

// Sample tour data for seeding
const tourData = [
    { 
        title: "Bali Beach Tour",
        description: "A relaxing beach holiday in Bali.",
        price: 700,
        availableDates: ["2024-06-01", "2024-07-15"],
        image: "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg",
    },
    { 
        title: "Paris Getaway",
        description: "Experience the beauty of Paris.",
        price: 900,
        availableDates: ["2024-06-10", "2024-07-20"],
        image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
    },
    { 
        title: "Rome Adventure",
        description: "Discover the ancient city of Rome.",
        price: 800,
        availableDates: ["2024-05-15", "2024-08-10"],
        image: "https://images.pexels.com/photos/1005635/pexels-photo-1005635.jpeg",
    },
    { 
        title: "Swiss Alps Tour",
        description: "A scenic journey through the Swiss Alps.",
        price: 1200,
        availableDates: ["2024-06-25", "2024-09-15"],
        image: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg",
    },
    { 
        title: "Tokyo Lights",
        description: "Experience the vibrant life of Tokyo.",
        price: 1000,
        availableDates: ["2024-07-01", "2024-08-20"],
        image: "https://images.pexels.com/photos/386025/pexels-photo-386025.jpeg",
    },
    { 
        title: "Maldives Luxury Retreat",
        description: "Relax in a luxurious Maldives resort.",
        price: 1500,
        availableDates: ["2024-06-01", "2024-09-01"],
        image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
    },
    { 
        title: "New York Explorer",
        description: "Explore the Big Apple with this package.",
        price: 950,
        availableDates: ["2024-04-15", "2024-10-15"],
        image: "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg",
    },
    { 
        title: "Dubai Desert Safari",
        description: "An adventurous desert safari in Dubai.",
        price: 850,
        availableDates: ["2024-05-20", "2024-09-10"],
        image: "https://images.pexels.com/photos/248795/pexels-photo-248795.jpeg",
    },
    { 
        title: "London Classic Tour",
        description: "Explore the history and culture of London.",
        price: 1100,
        availableDates: ["2024-06-15", "2024-08-15"],
        image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg",
    },
    { 
        title: "Iceland Northern Lights",
        description: "Witness the beauty of the northern lights.",
        price: 1300,
        availableDates: ["2024-11-01", "2025-02-15"],
        image: "https://images.pexels.com/photos/2580912/pexels-photo-2580912.jpeg",
    },
    { 
        title: "Sydney Harbour Tour",
        description: "Enjoy a scenic harbour tour in Sydney.",
        price: 1050,
        availableDates: ["2024-06-10", "2024-09-20"],
        image: "https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg",
    },
    { 
        title: "Santorini Sunset Tour",
        description: "Experience the mesmerizing sunsets of Santorini.",
        price: 900,
        availableDates: ["2024-05-10", "2024-09-15"],
        image: "https://images.pexels.com/photos/1640987/pexels-photo-1640987.jpeg",
    },
    { 
        title: "Amazon Rainforest Adventure",
        description: "Explore the biodiversity of the Amazon rainforest.",
        price: 1250,
        availableDates: ["2024-07-01", "2024-10-01"],
        image: "https://images.pexels.com/photos/33103/pexels-photo.jpg",
    },
    { 
        title: "Great Wall of China Tour",
        description: "Walk along the historical Great Wall of China.",
        price: 850,
        availableDates: ["2024-05-15", "2024-09-30"],
        image: "https://images.pexels.com/photos/258447/pexels-photo-258447.jpeg",
    },
    { 
        title: "Egyptian Pyramids Tour",
        description: "Marvel at the ancient pyramids of Egypt.",
        price: 950,
        availableDates: ["2024-06-10", "2024-10-20"],
        image: "https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg",
    },
    { 
        title: "Patagonia Hiking Adventure",
        description: "A hiking adventure in Patagonia's stunning landscapes.",
        price: 1400,
        availableDates: ["2024-09-01", "2025-01-15"],
        image: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg",
    },
];

// Function to seed database
const seedDatabase = async () => {
    try {
        await Package.deleteMany(); // Clear existing data
        console.log("Existing packages removed.");

        await Package.insertMany(tourData); // Insert new data
        console.log("Tour packages seeded successfully.");
    } catch (err) {
        console.error("Error seeding database:", err.message);
    }
};

// Import Routes
const packageRoutes = require("./routes/packages");
const bookingRoutes = require("./routes/bookings");

app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);

// Health Check Route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Travel Agency API is running successfully.",
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
