import React, { useState } from "react";

const GlobalSearchBox = ({ onSearch }) => {
    const [title, setTitle] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [date, setDate] = useState("");
    const [guests, setGuests] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch({ title, minPrice, maxPrice, date, guests });
    };

    return (
        <div className="bg-gray-100 p-4 rounded-md">
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Search Destination"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 border rounded"
                />
                <div className="flex gap-4">
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="p-2 border rounded"
                    />
                </div>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Number of Guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="p-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default GlobalSearchBox;
