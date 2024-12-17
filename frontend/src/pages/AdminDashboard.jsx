import React, { useState, useEffect } from "react";
import { getPackages, getBookings, createPackage, deletePackage, updatePackage } from "../api/api";

const AdminDashboard = () => {
    const [packages, setPackages] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [editingPackage, setEditingPackage] = useState(null); // State for editing
    const [newPackage, setNewPackage] = useState({
        title: "",
        description: "",
        price: "",
        availableDates: "",
        image: "",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const packagesResponse = await getPackages();
                setPackages(packagesResponse.data.data);
                const bookingsResponse = await getBookings();
                setBookings(bookingsResponse.data);
            } catch (err) {
                setError("Failed to load admin data.");
            }
        };

        fetchData();
    }, []);

    const handleCreatePackage = async (e) => {
        e.preventDefault();
        try {
            const response = await createPackage({
                ...newPackage,
                availableDates: newPackage.availableDates.split(",").map((date) => date.trim()),
            });
            setPackages((prev) => [...prev, response.data.data]);
            setNewPackage({ title: "", description: "", price: "", availableDates: "", image: "" });
            alert("Package created successfully!");
        } catch (err) {
            alert("Failed to create package.");
        }
    };

    const handleDeletePackage = async (id) => {
        try {
            await deletePackage(id);
            setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
            alert("Package deleted successfully!");
        } catch (err) {
            alert("Failed to delete package.");
        }
    };

    const handleEditPackage = async (e) => {
        e.preventDefault();
        try {
            await updatePackage(editingPackage._id, editingPackage);
            setPackages((prev) =>
                prev.map((pkg) => (pkg._id === editingPackage._id ? editingPackage : pkg))
            );
            setEditingPackage(null);
            alert("Package updated successfully!");
        } catch (err) {
            alert("Failed to update package.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            {error && <p className="text-red-500">{error}</p>}

            {/* Create New Package */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Create New Package</h2>
                <form onSubmit={handleCreatePackage} className="grid grid-cols-1 gap-4 max-w-xl">
                    <input
                        type="text"
                        placeholder="Title"
                        value={newPackage.title}
                        onChange={(e) => setNewPackage({ ...newPackage, title: e.target.value })}
                        className="p-2 border rounded"
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={newPackage.description}
                        onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newPackage.price}
                        onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Available Dates (comma-separated)"
                        value={newPackage.availableDates}
                        onChange={(e) =>
                            setNewPackage({ ...newPackage, availableDates: e.target.value })
                        }
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newPackage.image}
                        onChange={(e) => setNewPackage({ ...newPackage, image: e.target.value })}
                        className="p-2 border rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Create Package
                    </button>
                </form>
            </section>

            {/* Manage Packages */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Manage Packages</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {packages.map((pkg) => (
                        <div key={pkg._id} className="border p-4 rounded shadow">
                            <h3 className="font-bold text-lg">{pkg.title}</h3>
                            <p>{pkg.description}</p>
                            <p className="text-gray-600">${pkg.price}</p>
                            <button
                                onClick={() => handleDeletePackage(pkg._id)}
                                className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setEditingPackage(pkg)}
                                className="ml-2 mt-2 bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Edit Package Form */}
            {editingPackage && (
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Edit Package</h2>
                    <form onSubmit={handleEditPackage} className="grid grid-cols-1 gap-4 max-w-xl">
                        <input
                            type="text"
                            placeholder="Title"
                            value={editingPackage.title}
                            onChange={(e) =>
                                setEditingPackage({ ...editingPackage, title: e.target.value })
                            }
                            className="p-2 border rounded"
                            required
                        />
                        <textarea
                            placeholder="Description"
                            value={editingPackage.description}
                            onChange={(e) =>
                                setEditingPackage({ ...editingPackage, description: e.target.value })
                            }
                            className="p-2 border rounded"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={editingPackage.price}
                            onChange={(e) =>
                                setEditingPackage({ ...editingPackage, price: e.target.value })
                            }
                            className="p-2 border rounded"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                            Update Package
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditingPackage(null)}
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </form>
                </section>
            )}

            {/* View Bookings */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">View Bookings</h2>
                {bookings.map((booking) => (
                    <div key={booking._id} className="mb-4 p-4 border rounded shadow">
                        <p>
                            <strong>Name:</strong> {booking.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {booking.email}
                        </p>
                        <p>
                            <strong>Package:</strong> {booking.packageId?.title || "N/A"}
                        </p>
                        <p>
                            <strong>Total Price:</strong> ${booking.totalPrice}
                        </p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default AdminDashboard;
