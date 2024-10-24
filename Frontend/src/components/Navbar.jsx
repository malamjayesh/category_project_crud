import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-indigo-900 p-4">
      <div className="flex justify-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/category" className="text-white hover:text-gray-300">
              Category
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
