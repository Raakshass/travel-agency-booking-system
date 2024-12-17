import React from "react";
import { Link } from "react-router-dom";

const PackageCard = ({ pkg }) => {
    return (
        <div className="border p-4 rounded-lg shadow-md mb-4">
            <Link to={`/packages/${pkg._id}`} className="text-2xl font-bold text-blue-600 hover:underline">
                {pkg.title}
            </Link>
            <p>{pkg.description}</p>
            <p className="text-gray-700">Price: ${pkg.price}</p>
        </div>
    );
};

export default PackageCard;
