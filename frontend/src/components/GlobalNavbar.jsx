import React from "react";
import NavbarItems from "./NavbarItems";

const GlobalNavbar = () => {
    const links = [
        { name: "Home", to: "/" },
        { name: "Tours", to: "/packages" },
        { name: "About Us", to: "/about" },
        { name: "Contact", to: "/contact" },
    ];

    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    <a href="/">Travel Agency</a>
                </h1>
                <NavbarItems links={links} />
            </div>
        </nav>
    );
};

export default GlobalNavbar;
