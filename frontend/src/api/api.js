import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api", // Backend base URL
});

// Function to clean query parameters and remove undefined or empty values
const cleanParams = (params) => {
    const cleaned = {};
    Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== "") {
            cleaned[key] = params[key];
        }
    });
    return cleaned;
};

// Fetch all tour packages with query parameters
export const getPackages = (params = {}) => {
    const cleanedParams = cleanParams(params); // Remove undefined/empty params
    const queryString = new URLSearchParams(cleanedParams).toString();
    return API.get(`/packages?${queryString}`);
};

// Fetch a single package by ID
export const getPackageById = (id) => API.get(`/packages/${id}`);

// Create a new package
export const createPackage = (packageData) => API.post("/packages", packageData);

// Delete a package by ID
export const deletePackage = (id) => API.delete(`/packages/${id}`);

// Fetch all bookings
export const getBookings = () => API.get("/bookings");

// Create a booking
export const createBooking = (bookingData) => API.post("/bookings", bookingData);
export const updatePackage = (id, packageData) => API.put(`/packages/${id}`, packageData);
