import React from "react";

const HotelViewCardSkeleton = () => {
    return (
        <div className="border rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="bg-gray-300 w-full h-40"></div>
            <div className="p-4">
                <div className="bg-gray-300 h-6 mb-4 rounded"></div>
                <div className="bg-gray-300 h-4 mb-2 rounded"></div>
                <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
            </div>
        </div>
    );
};

export default HotelViewCardSkeleton;
