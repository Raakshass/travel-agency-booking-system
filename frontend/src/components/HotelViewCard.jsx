import React from "react";

const HotelViewCard = ({ tour }) => {
    return (
        <div className="border rounded-lg shadow-md overflow-hidden">
            <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{tour.title}</h2>
                <p className="text-gray-600 mb-4">{tour.description}</p>
                <div className="flex justify-between items-center">
                    <p className="text-blue-600 font-semibold">
                        ${tour.price} / person
                    </p>
                    <a
                        href={`/packages/${tour._id}`}
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        View Details
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HotelViewCard;
