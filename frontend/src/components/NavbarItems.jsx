import React from "react";
import { NavLink } from "react-router-dom";

const NavbarItems = ({ links }) => {
    return (
        <div className="flex space-x-6">
            {links.map((link) => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                        isActive
                            ? "text-yellow-400 underline"
                            : "text-white hover:text-yellow-300"
                    }
                >
                    {link.name}
                </NavLink>
            ))}
        </div>
    );
};

export default NavbarItems;
