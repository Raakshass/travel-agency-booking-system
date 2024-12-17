import React, { useEffect, useState } from "react";
import { getPackages } from "../api/api";
import GlobalSearchBox from "../components/GlobalSearchBox";
import HotelViewCard from "../components/HotelViewCard";
import HotelViewCardSkeleton from "../components/HotelViewCardSkeleton";

const Home = () => {
    const [packages, setPackages] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // State for Filters, Sorting, and Pagination
    const [filters, setFilters] = useState({
        title: "",
        minPrice: "",
        maxPrice: "",
    });
    const [sort, setSort] = useState(""); // Sorting state
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Function to fetch packages from API
    const fetchPackages = async () => {
        setLoading(true);
        setError("");

        try {
            // Combine all query params
            const params = {
                title: filters.title || undefined,
                minPrice: filters.minPrice || undefined,
                maxPrice: filters.maxPrice || undefined,
                sort: sort || undefined,
                page,
                limit: 5,
            };

            console.log("Sending API Params:", params); // Debugging
            const response = await getPackages(params);
            console.log("API Response:", response.data); // Debugging

            setPackages(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            console.error("Error fetching packages:", err.message);
            setError("Failed to load packages. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Update data whenever filters, sorting, or page changes
    useEffect(() => {
        fetchPackages();
    }, [filters, sort, page]);

    // Handle Search
    const handleSearch = (newFilters) => {
        setFilters({
            title: newFilters.title || "",
            minPrice: newFilters.minPrice || "",
            maxPrice: newFilters.maxPrice || "",
        });
        setPage(1); // Reset page to 1 when new filters are applied
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Tour Packages</h1>

            {/* Search Box */}
            <GlobalSearchBox onSearch={handleSearch} />

            {/* Sorting Dropdown */}
            <div className="flex justify-end mb-4">
                <select
                    value={sort}
                    onChange={(e) => {
                        setSort(e.target.value);
                        setPage(1); // Reset to first page on sort change
                    }}
                    className="p-2 border rounded"
                >
                    <option value="">Sort By</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="titleAsc">Title: A to Z</option>
                    <option value="titleDesc">Title: Z to A</option>
                </select>
            </div>

            {/* Error Handling */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Results Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <HotelViewCardSkeleton key={index} />
                    ))
                ) : packages.length > 0 ? (
                    packages.map((tour) => (
                        <HotelViewCard key={tour._id} tour={tour} />
                    ))
                ) : (
                    <p>No packages available. Try adjusting your filters.</p>
                )}
            </div>

            {/* Pagination Controls */}
            {!loading && packages.length > 0 && (
                <div className="mt-6 flex justify-center gap-4">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() =>
                            setPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;
