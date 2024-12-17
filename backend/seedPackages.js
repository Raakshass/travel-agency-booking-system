const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Package = require("./models/Package"); // Adjust path to your Package model

dotenv.config();

// Tour data with titles, descriptions, prices, available dates, and real image links
const tourData = [
    { title: "Bali Beach Tour", description: "A relaxing beach holiday in Bali.", price: 700, availableDates: ["2024-06-01", "2024-07-15"], image: "https://source.unsplash.com/featured/?bali,beach" },
    { title: "Paris Getaway", description: "Experience the beauty of Paris.", price: 900, availableDates: ["2024-06-10", "2024-07-20"], image: "https://source.unsplash.com/featured/?paris,eiffel" },
    { title: "Tokyo City Tour", description: "Explore the vibrant streets of Tokyo.", price: 1200, availableDates: ["2024-08-05", "2024-09-15"], image: "https://source.unsplash.com/featured/?tokyo,city" },
    { title: "Rome Historical Tour", description: "A journey through Roman history.", price: 800, availableDates: ["2024-06-20", "2024-07-30"], image: "https://source.unsplash.com/featured/?rome,colosseum" },
    { title: "New York City Adventure", description: "See the iconic landmarks of NYC.", price: 1100, availableDates: ["2024-06-25", "2024-08-01"], image: "https://source.unsplash.com/featured/?newyork,city" },
    { title: "Sydney Opera Tour", description: "Enjoy the cultural beauty of Sydney.", price: 1000, availableDates: ["2024-07-05", "2024-08-10"], image: "https://source.unsplash.com/featured/?sydney,opera" },
    { title: "Maldives Luxury Getaway", description: "A luxurious beach holiday in Maldives.", price: 1500, availableDates: ["2024-06-15", "2024-09-05"], image: "https://source.unsplash.com/featured/?maldives,beach" },
    { title: "London City Tour", description: "Visit London’s most iconic spots.", price: 950, availableDates: ["2024-06-12", "2024-07-22"], image: "https://source.unsplash.com/featured/?london,city" },
    { title: "Dubai Desert Safari", description: "A thrilling desert safari adventure.", price: 850, availableDates: ["2024-08-12", "2024-09-10"], image: "https://source.unsplash.com/featured/?dubai,desert" },
    { title: "Bangkok Shopping Tour", description: "Enjoy the markets and malls of Bangkok.", price: 600, availableDates: ["2024-07-01", "2024-08-12"], image: "https://source.unsplash.com/featured/?bangkok,shopping" },
    { title: "Kyoto Cultural Tour", description: "Experience traditional Japanese culture.", price: 950, availableDates: ["2024-07-20", "2024-08-30"], image: "https://source.unsplash.com/featured/?kyoto,temple" },
    { title: "Amsterdam Canal Tour", description: "A relaxing boat tour through Amsterdam.", price: 880, availableDates: ["2024-06-18", "2024-07-28"], image: "https://source.unsplash.com/featured/?amsterdam,canal" },
    { title: "Istanbul City Tour", description: "Visit the historical sites of Istanbul.", price: 750, availableDates: ["2024-06-23", "2024-07-25"], image: "https://source.unsplash.com/featured/?istanbul,city" },
    { title: "Cape Town Nature Safari", description: "A nature-filled adventure in Cape Town.", price: 1300, availableDates: ["2024-07-10", "2024-09-15"], image: "https://source.unsplash.com/featured/?capetown,safari" },
    { title: "Santorini Romantic Getaway", description: "Enjoy the beauty of Santorini’s beaches.", price: 1200, availableDates: ["2024-07-05", "2024-08-10"], image: "https://source.unsplash.com/featured/?santorini,beach" },
    { title: "Las Vegas Casino Nights", description: "Experience the nightlife of Las Vegas.", price: 1250, availableDates: ["2024-06-25", "2024-08-05"], image: "https://source.unsplash.com/featured/?lasvegas,casino" },
    { title: "Rio Carnival Tour", description: "Be part of the vibrant Rio Carnival.", price: 1400, availableDates: ["2024-06-18", "2024-09-01"], image: "https://source.unsplash.com/featured/?rio,carnival" },
    { title: "Barcelona Art Tour", description: "Visit the art and architecture of Barcelona.", price: 950, availableDates: ["2024-07-15", "2024-08-25"], image: "https://source.unsplash.com/featured/?barcelona,art" },
    { title: "Cairo Pyramids Tour", description: "Explore the ancient wonders of Egypt.", price: 700, availableDates: ["2024-06-05", "2024-07-30"], image: "https://source.unsplash.com/featured/?cairo,pyramids" },
    { title: "Alaska Cruise Adventure", description: "A luxurious cruise across Alaskan waters.", price: 2000, availableDates: ["2024-07-10", "2024-09-20"], image: "https://source.unsplash.com/featured/?alaska,cruise" }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connected. Seeding data...");

        // Clear existing packages
        await Package.deleteMany();
        console.log("Existing packages removed.");

        // Insert new data
        await Package.insertMany(tourData);
        console.log("Tour packages seeded successfully.");

        process.exit();
    } catch (err) {
        console.error("Error seeding database:", err.message);
        process.exit(1);
    }
};

seedDatabase();
