Travel Agency Booking System
A simple and feature-rich travel agency application that enables users to explore tour packages, book packages, generate invoices, and manage bookings via an admin panel.

📌 Objective
The project aims to:

Display available tour packages with details.
Allow customers to book packages.
Generate a downloadable invoice for the booking.
Provide an admin panel to manage tour packages and view bookings.
🚀 Features
1. Tour Packages Page
Display a list of available tour packages with:
Title
Description
Price
Available Dates
Images
Search and filter functionality for packages:
Search by title.
Filter by price range.
Sort by price (ascending/descending) or title (A-Z/Z-A).
Pagination to manage large datasets.
2. Package Booking
Users can book a package by filling a form with the following details:
Name
Email
Phone Number
Number of Travelers
Special Requests (optional)
Booking data is saved in the MongoDB database.
A downloadable PDF invoice is generated automatically with:
Customer details
Package details
Total price (calculated as price per person × number of travelers).
3. Admin Panel
Access: A hardcoded route (/admin).
Manage tour packages with CRUD operations:
Add new packages.
Update existing packages.
Delete packages.
View all submitted bookings:
Display customer details and package information.
Total price for each booking.
🛠️ Technical Stack
Frontend
React.js: Component-based UI development.
TailwindCSS: Responsive and visually appealing design.
React Hooks: State and lifecycle management.
Backend
Node.js: JavaScript runtime environment.
Express.js: Backend framework for building RESTful APIs.
MongoDB: Database to store packages and bookings.
Mongoose: ODM for MongoDB.
Other Libraries
jspdf: To generate PDF invoices.
axios: API requests from the frontend.
nodemon: Development server auto-restart.
cors: Cross-Origin Resource Sharing for API requests.
⚙️ API Endpoints
Packages
GET /api/packages - Retrieve all tour packages.
GET /api/packages/:id - Retrieve a specific package.
POST /api/admin/packages - Add a new package.
PUT /api/admin/packages/:id - Update an existing package.
DELETE /api/admin/packages/:id - Delete a package.
Bookings
POST /api/bookings - Create a new booking.
GET /api/bookings - Retrieve all bookings.
📁 Folder Structure
bash
Copy code
travel-agency-booking-system/
│
├── backend/
│   ├── models/             # Mongoose models
│   ├── routes/             # API route handlers
│   ├── seedPackages.js     # Script to seed initial packages
│   ├── server.js           # Main backend server
│   └── .env                # Environment variables
│
├── frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── api/            # API utility functions
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages (Home, Admin, TourDetails)
│   │   ├── App.js          # Main app component
│   │   └── index.js        # React entry point
│   └── tailwind.config.js  # TailwindCSS configuration
│
└── README.md
🚀 Setup Instructions
1. Clone the Repository
bash
Copy code
git clone https://github.com/Raakshass/travel-agency-booking-system.git
cd travel-agency-booking-system
2. Install Dependencies
Backend:
bash
Copy code
cd backend
npm install
Frontend:
bash
Copy code
cd ../frontend
npm install
3. Set Up MongoDB
Create a MongoDB database (local or cloud via MongoDB Atlas).
Add your MongoDB URI to the .env file in the backend:
makefile
Copy code
MONGO_URI=<Your MongoDB Connection String>
PORT=5000
4. Seed Initial Data
Run the following command in the backend folder:

bash
Copy code
npm run seed
5. Start the Project
Backend:
bash
Copy code
cd backend
npm start
Frontend:
bash
Copy code
cd frontend
npm start
Open the app in your browser at http://localhost:3000.
🎉 Deliverables
GitHub Repository: Organized folder structure, clean commit history.
Features Implemented:
Tour package display with search, filter, and pagination.
Package booking with form validation.
Automatic invoice generation (PDF download).
Admin panel for managing packages and viewing bookings.
Optional Features:
Search and filter functionality.
Downloadable PDF invoices.
💡 Conclusion
This project fulfills all the core requirements of a Travel Agency Booking System, with additional enhancements like search, filtering, and invoice generation.