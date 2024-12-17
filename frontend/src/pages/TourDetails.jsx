import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPackageById, createBooking } from "../api/api";
import { jsPDF } from "jspdf";

const TourDetails = () => {
    const { id } = useParams();
    const [tourPackage, setTourPackage] = useState(null);
    const [bookingData, setBookingData] = useState({
        name: "",
        email: "",
        phone: "",
        travelers: 1,
        requests: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Fetch package details
    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const response = await getPackageById(id);
                setTourPackage(response.data);
            } catch (err) {
                setError("Failed to load package details.");
            }
        };

        fetchPackage();
    }, [id]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingData({ ...bookingData, [name]: value });
    };

    // Generate PDF Invoice
    const generateInvoice = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Booking Invoice", 20, 20);

        doc.setFontSize(12);
        doc.text(`Customer Name: ${bookingData.name}`, 20, 40);
        doc.text(`Email: ${bookingData.email}`, 20, 50);
        doc.text(`Phone: ${bookingData.phone}`, 20, 60);
        doc.text(`Number of Travelers: ${bookingData.travelers}`, 20, 70);
        doc.text(`Special Requests: ${bookingData.requests || "N/A"}`, 20, 80);

        doc.text(`Package Title: ${tourPackage.title}`, 20, 100);
        doc.text(`Price per Person: $${tourPackage.price}`, 20, 110);
        doc.text(`Total Price: $${tourPackage.price * bookingData.travelers}`, 20, 120);

        // Save the file
        doc.save("booking-invoice.pdf");
    };

    // Handle booking submission
    const handleBooking = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
    
        try {
            // Prepare the request body with correct field names
            const bookingPayload = {
                name: bookingData.name,
                email: bookingData.email,
                phone: bookingData.phone,
                travelers: bookingData.travelers,
                requests: bookingData.requests, // Match with 'requests' on backend
                packageId: id, // Current package ID
                totalPrice: tourPackage.price * bookingData.travelers,
            };
    
            console.log("Sending Booking Request:", bookingPayload);
    
            // Send booking request
            await createBooking(bookingPayload);
    
            setSuccess(true); // Show success message
            generateInvoice(); // Download the PDF invoice
        } catch (err) {
            console.error("Booking failed:", err.message);
            setError("Failed to create booking. Please try again.");
        }
    };

    return (
        <div className="p-6">
            {tourPackage ? (
                <>
                    <h1 className="text-3xl font-bold">{tourPackage.title}</h1>
                    <p><strong>Description:</strong> {tourPackage.description}</p>
                    <p><strong>Price:</strong> ${tourPackage.price}</p>

                    <h2 className="text-2xl mt-6 font-semibold">Book This Package</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">Booking successful! Invoice downloaded.</p>}

                    <form onSubmit={handleBooking} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={bookingData.name}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={bookingData.email}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={bookingData.phone}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                            required
                        />
                        <input
                            type="number"
                            name="travelers"
                            placeholder="Number of Travelers"
                            min="1"
                            value={bookingData.travelers}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                            required
                        />
                        <textarea
                            name="requests"
                            placeholder="Special Requests"
                            value={bookingData.requests}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Book Now
                        </button>
                    </form>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TourDetails;
